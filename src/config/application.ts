import AppDirectory = require("appdirectory");
import { app } from "electron";

const appDirectories = new AppDirectory({
	appName: app && app.isPackaged ? "Lovely Inbox" : "Lovely Inbox (Dev)",
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

export const ApplicationConfig: Readonly<IApplicationConfig> = {
	isDev: !(app && app.isPackaged),

	directories: {
		cache: appDirectories.userCache(),
		config: appDirectories.userConfig(),
		data: appDirectories.userData(),
		logs: appDirectories.userLogs(),
	},
};
