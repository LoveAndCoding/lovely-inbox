import { app, BrowserWindow, Tray } from "electron";

import logger from "./logger";
import WindowManager from "./window.manager";

const windower = new WindowManager(
	MAIN_WINDOW_WEBPACK_ENTRY,
	ONBOARDING_WEBPACK_ENTRY,
);

/**
 * bringAppUp
 *
 * Initializes and brings up the application window
 */
function bringAppUp() {
	// TODO(alexis): Load onboarding material instead if the user has not
	// configured the app
	windower.openInbox();
}

app.on("ready", bringAppUp);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On OS X it"s common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		logger.info("Application is being reactivated from being closed");
		bringAppUp();
	}
});
