import AppDirectory = require("appdirectory");
import { app } from "electron";

// Delcaring some globals defined by tooling
declare const LOVELY_INBOX_WEBPACK_ENTRY: string;
declare const LOVELY_INBOX_ONBOARDING_WEBPACK_ENTRY: string;

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

	entrypoints: {
		main: string;
		onboarding: string;
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

	entrypoints: {
		main: LOVELY_INBOX_WEBPACK_ENTRY,
		onboarding: LOVELY_INBOX_ONBOARDING_WEBPACK_ENTRY,
	},
};
