import { AccountId } from "../account/account";
import logger from "../logger";
import FileStorage, { StorageTypes } from "../storage/file.storage";

interface IUserConfig {
	completedOnBoarding: boolean;
	accounts: AccountId[];
}

class UserConfigStore implements IUserConfig {
	private userConfigStorage: FileStorage<IUserConfig>;

	constructor() {
		this.userConfigStorage = new FileStorage(
			"user.config",
			StorageTypes.Config,
		);
	}

	get completedOnBoarding(): boolean {
		return this.userConfigStorage.get<"completedOnBoarding", boolean>(
			"completedOnBoarding",
			false,
		);
	}

	get accounts(): AccountId[] {
		return Array.from(
			this.userConfigStorage.get<"accounts", AccountId[]>("accounts", []),
		);
	}

	public async changeOnboardingStatus(finished: boolean) {
		return await this.userConfigStorage.save(
			"completedOnBoarding",
			finished,
		);
	}

	public async addAccount(id: AccountId): Promise<boolean> {
		logger.info(`Adding new account with ID ${id}`);
		const accts = this.accounts;
		accts.push(id);
		return await this.userConfigStorage.save("accounts", accts);
	}

	public async removeAccount(id: AccountId): Promise<boolean> {
		let accts = this.accounts;
		accts = accts.filter((acct) => acct !== id);

		if (accts.length === 0) {
			return await this.userConfigStorage.delete("accounts");
		} else {
			return await this.userConfigStorage.save("accounts", accts);
		}
	}
}

export const UserConfig = new UserConfigStore();
