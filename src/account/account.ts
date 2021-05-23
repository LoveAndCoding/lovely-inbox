import logger from "../logger";
import PlainAuthScheme, { PasswordEntryCancel } from "../authentication/plain";
import { IAccountProperties } from "../common/account";
import { IEmailProperties } from "../common/email";
import { IServerConfig } from "../common/server.config";
import IMAPConnection from "../server/imap.connection";
import FileStorage, { StorageTypes } from "../storage/file.storage";
import SecureStorage from "../storage/secure.storage";

export type AccountId = string;

interface IAccountSecureConfig {
	password?: string;
	oauthToken?: string;
}

interface IAccountInsecureConfig {
	id: AccountId;
	serverConfig: IServerConfig;
	email: IEmailProperties;
}

export default class Account implements IAccountProperties {
	public static async create(
		serverConfig: IServerConfig,
		email?: IEmailProperties,
	): Promise<Account | void> {
		// Generate a new ID; Time + random value + username should be unique
		const id: AccountId =
			Date.now() +
			"_" +
			Math.round(Math.random() * 10000) +
			serverConfig.username.replace(/[^a-zA-Z0-9]+/g, "_");

		const acct = new Account(id);
		acct.emailProps = email;

		// Validate our configuration by logging in
		if (serverConfig.incoming) {
			const connected = await acct.connectIMAP(serverConfig);

			// If we couldn't connect, stop account creation and don't save
			if (!connected) {
				await acct.destroy();
				return null;
			}
		}

		// Stash our current configuration
		await acct.insecureStore.save("id", id);
		await acct.insecureStore.save("serverConfig", serverConfig);
		if (email) {
			await acct.insecureStore.save("email", email);
		}

		return acct;
	}

	/**
	 * Load in an existing account and it's settings from storage
	 *
	 * @param id {AccountID} ID of the Account to load in
	 */
	public static async load(id: AccountId): Promise<Account> {
		const acct = new Account(id);
		await acct.preload();
		return acct;
	}

	protected readonly insecureStore: FileStorage<IAccountInsecureConfig>;
	protected readonly secureStore: SecureStorage<keyof IAccountSecureConfig>;
	protected emailProps: IEmailProperties;

	protected incomingConnection: IMAPConnection | void;

	constructor(public readonly id: AccountId) {
		this.insecureStore = new FileStorage(id, StorageTypes.Config);
		this.secureStore = new SecureStorage(`enc.${id}`, StorageTypes.Config);
	}

	public get email(): IEmailProperties {
		return Object.assign({}, this.emailProps);
	}

	public async destroy(): Promise<boolean> {
		const insecureDestroy = await this.insecureStore.destroy();
		const secureDestroy = await this.secureStore.destroy();

		return insecureDestroy && secureDestroy;
	}

	public async connectIMAP(serverConfig: IServerConfig): Promise<boolean> {
		if (this.incomingConnection) {
			// We're already connected, return that connection
			return true;
		}

		const incomingConfig = serverConfig.incoming;
		if (!incomingConfig) {
			// If we don't have an incoming server config, we can't connect
			return false;
		}

		if (incomingConfig.protocol !== "imap") {
			// We only support IMAP connections right now. This should never
			// happen due to typing, but future-proofing this for now
			return false;
		}

		const config = Object.assign({}, incomingConfig.server, {
			user: serverConfig.username,
		});
		const conn = new IMAPConnection(config);
		// TODO(alexis): Need to pick the right scheme for the server
		const authScheme = new PlainAuthScheme(serverConfig.username);

		// TODO(alexis): Should we run an IMAP connection test here? This would
		// help us know there is an IMAP server, but we would also need to pop
		// a dialog so the user knows what's going on, and it could be slow.

		// We will retry asking for the password until we successfully
		// login, reach the password attempt limit, or the user hits
		// cancel on the modal.
		let password: string;
		let store = false;
		let connected = false;
		try {
			[password, store] = await authScheme.challenge(async (password) => {
				try {
					connected = await conn.connect(password);
				} catch (reason) {
					console.debug("Unable to connect to IMAP server", reason);
				}
				return connected;
			});
		} catch (reason) {
			if (reason instanceof PasswordEntryCancel) {
				logger.debug("User canceled password entry");
			} else {
				logger.error("Unknown error during password entry", reason);
			}
		}

		if (connected && store) {
			await this.secureStore.save("password", password);
		}

		return connected;
	}

	public get portableProps(): IAccountProperties {
		return {
			id: this.id,
			email: this.email,
		};
	}

	/**
	 * Load in some properties that are better to not have to read from disk
	 * every time we need them
	 */
	public async preload(): Promise<void> {
		// Read in email properties if we have any
		this.emailProps = await this.insecureStore.get("email", null);
	}
}
