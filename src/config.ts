import * as AppDirectory from "appdirectory";
import { app } from "electron";

const appDirectories = new AppDirectory({
	appName: app.isPackaged ? "Lovely Inbox (Dev)" : "Lovely Inbox",
});

interface IConfig {
	isDev: boolean;

	directories: {
		cache: string;
		config: string;
		data: string;
		logs: string;
	};
}

export const Config: ReadOnly<IConfig> = {
	isDev: app.isPackaged,

	directories: {
		cache: appDirectories.userCache(),
		config: appDirectories.userConfig(),
		data: appDirectories.userData(),
		logs: appDirectories.userLogs(),
	},
};
