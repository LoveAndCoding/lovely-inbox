import Account, { AccountId } from "./account";
import { IEmailProperties } from "../common/email";
import { IServerConfig } from "../common/server.config";
import { UserConfig } from "../config/user";
import logger from "../logger";
import FileStorage, { StorageTypes } from "../storage/file.storage";

interface IAccountListConfig {
	accounts: AccountId[];
}

export default class AccountManager {
	private accounts: Map<AccountId, Account>;

	constructor() {
		this.accounts = new Map();
		this.loadAccounts();
	}

	protected loadAccounts() {
		const acctList = UserConfig.accounts;
		acctList.forEach((acctId) => {
			const acct = new Account(acctId);
			this.accounts.set(acctId, acct);

			// We'll add them right away, but do some preloading of data in the
			// background for ease of access later
			acct.preload()
				.then(() => {
					logger.info(`Account data preloaded for ${acctId}`);
				})
				.catch((reason) => {
					logger.error(
						`Unable to preload account data for ${acctId}`,
						reason,
					);
				});
		});
	}

	public async createAccount(
		config: IServerConfig,
		email: IEmailProperties,
	): Promise<Account> {
		const acct = await Account.create(config);
		this.accounts.set(acct.id, acct);
		await UserConfig.addAccount(acct.id);

		return acct;
	}

	public async deleteAccount(id: AccountId): Promise<boolean> {
		const acct = this.accounts.get(id);
		if (!acct) {
			throw new Error("Account not found");
		}

		return (await acct.destroy()) && (await UserConfig.removeAccount(id));
	}

	public getAccount(id: AccountId) {
		return this.accounts.get(id);
	}
}
