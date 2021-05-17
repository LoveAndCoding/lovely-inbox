import { app } from "electron";

import { UserConfig } from "./config";
import logger from "./logger";
import setupUnhandledListeners from "./process.error.handlers";
import WindowManager from "./window";

// Before we do anything else, setup handlers for any missed errors
setupUnhandledListeners();

// Configure some app level things
app.allowRendererProcessReuse = true;

/**
 * bringAppUp
 *
 * Initializes and brings up the application window
 */
function bringAppUp() {
	// Check if we've launched from squirrel
	if (require("electron-squirrel-startup")) {
		return app.quit();
	}

	if (UserConfig.completedOnBoarding) {
		logger.info("User has completed onboarding; Load Inbox");
		WindowManager.openInbox();
	} else {
		logger.info("User has not completed onboarding; Run them through it");
		WindowManager.openOnboarding();
	}
}

app.on("ready", bringAppUp);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin" && !WindowManager.persistApp) {
		app.quit();
	}
});

app.on("activate", () => {
	// On OS X it"s common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (!WindowManager.hasMainWindow()) {
		logger.info("Application is being reactivated from being closed");
		bringAppUp();
	}
});
