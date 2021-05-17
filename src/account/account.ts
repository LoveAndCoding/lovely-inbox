import { IAccountProperties } from "../common/account";
import { IEmailProperties } from "../common/email";
import { IServerConfig } from "../common/server.config";
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
	): Promise<Account> {
		// Generate a new ID; Time + random value + username should be unique
		const id: AccountId =
			Date.now() +
			"_" +
			Math.round(Math.random() * 10000) +
			serverConfig.username.replace(/[^a-zA-Z0-9]+/g, "_");

		const acct = new Account(id);
		// Stash our current configuration
		await acct.insecureStore.save("id", id);
		await acct.insecureStore.save("serverConfig", serverConfig);
		if (email) {
			await acct.insecureStore.save("email", email);
			acct.emailProps = email;
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
