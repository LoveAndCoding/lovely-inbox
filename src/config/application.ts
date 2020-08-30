import AppDirectory = require("appdirectory");
import { app } from "electron";
import * as fs from "fs";

// Delcaring some globals defined by tooling
declare const INBOX_WEBPACK_ENTRY: string;
declare const ONBOARDING_WEBPACK_ENTRY: string;

const APP_NAME = app && app.isPackaged ? "Lovely Inbox" : "Lovely Inbox (Dev)";
const AUTHOR_NAME = "Love & Coding";

const appDirectories = new AppDirectory({
	appName: APP_NAME,
	appAuthor: AUTHOR_NAME,
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
		main: INBOX_WEBPACK_ENTRY,
		onboarding: ONBOARDING_WEBPACK_ENTRY,
	},
	},
};

// For convenience, we make our application directories at this point so we
// can always rely on them existing later
fs.mkdirSync(ApplicationConfig.directories.cache, { recursive: true });
fs.mkdirSync(ApplicationConfig.directories.config, { recursive: true });
fs.mkdirSync(ApplicationConfig.directories.data, { recursive: true });
fs.mkdirSync(ApplicationConfig.directories.logs, { recursive: true });
