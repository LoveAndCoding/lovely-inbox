import FileStorage, { StorageTypes } from "../storage/file.storage";

interface IUserConfig {
	completedOnBoarding: boolean;
}

class UserConfigStore implements IUserConfig {
	private userConfigStorage: FileStorage;

	constructor() {
		this.userConfigStorage = new FileStorage(
			"user.config",
			StorageTypes.Config,
		);
	}

	get completedOnBoarding(): boolean {
		return this.userConfigStorage.get<boolean>("completedOnboarding");
	}
}

export const UserConfig = new UserConfigStore();
