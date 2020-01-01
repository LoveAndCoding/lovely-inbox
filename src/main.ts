import { app, BrowserWindow, Tray } from "electron";

import { UserConfig } from "./config";
import logger from "./logger";
import setupUnhandledListeners from "./process.error.handlers";
import { createAppRouter } from "./route";
import WindowManager from "./window/window.manager";

// Before we do anything else, setup handlers for any missed errors
setupUnhandledListeners();
const appRouter = createAppRouter();

// Create a new WindowManager which we'll use to control all of our windows
const windower = new WindowManager(
	MAIN_WINDOW_WEBPACK_ENTRY,
	ONBOARDING_WEBPACK_ENTRY,
	appRouter,
);

/**
 * bringAppUp
 *
 * Initializes and brings up the application window
 */
function bringAppUp() {
	if (UserConfig.completedOnBoarding) {
		logger.info("User has completed onboarding; Load Inbox");
		windower.openInbox();
	} else {
		logger.info("User has not completed onboarding; Run them through it");
		windower.openOnboarding();
	}
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
	if (!windower.hasMainWindow()) {
		logger.info("Application is being reactivated from being closed");
		bringAppUp();
	}
});
