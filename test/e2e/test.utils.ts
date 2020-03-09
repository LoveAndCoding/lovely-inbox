import * as electron from "electron";
import * as path from "path";

export const ROOT_DIR = path.join(__dirname, "..", "..");

export const ELECTRON_PATH = "" + electron;

// This should be kept in sync with the test:e2e:build command in package.json
// TODO(alexis): Do this better. A lot better. This is so ugly to rely on doing
// a linux build. We should just be able to use webpack to build it. But given
// how much electron-forge does under the hood, it's a bit tricky to do
export const APP_DIRECTORY = path.join(
	ROOT_DIR,
	"build",
	"test",
	"Lovely Inbox-linux-x64",
	"resources",
	"app",
);
