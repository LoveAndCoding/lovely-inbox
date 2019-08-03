import * as AppDirectory from "appdirectory";
import { app } from "electron";

const appDirectories = new AppDirectory({
	appName: app.isPackaged ? "Lovely Inbox (Dev)" : "Lovely Inbox",
});

interface IApplicationConfig {
	isDev: boolean;

	directories: {
		cache: string;
		config: string;
		data: string;
		logs: string;
	};
}

export const ApplicationConfig: ReadOnly<IApplicationConfig> = {
	isDev: !app.isPackaged,

	directories: {
		cache: appDirectories.userCache(),
		config: appDirectories.userConfig(),
		data: appDirectories.userData(),
		logs: appDirectories.userLogs(),
	},
};
