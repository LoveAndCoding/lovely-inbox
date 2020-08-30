import { IpcMainInvokeEvent } from "electron";

import { UserConfig } from "./user";
import logger from "../logger";
import Notifier from "../notify/notifier";
import WindowManager from "../window/window.manager";

function finishOnboarding(
	windowManager: WindowManager,
	finished: boolean,
): void {
	UserConfig.changeOnboardingStatus(finished)
		.then((succeeded) => {
			if (!succeeded) {
				logger.error("Onboarding status was not saved correctly?!");
				return;
			}

			logger.info(`Onboarding is now ${finished ? "done" : "starting"}`);
			if (windowManager) {
				// We always want to close all windows when changing onboarding
				windowManager.closeAllWindows(true);

				if (!finished) {
					// If we're starting on-boarding, open the onboarding flow
					windowManager.openOnboarding();
				} else {
					// Else if we're no longer onboarding, open the inbox
					windowManager.openInbox();
				}
			}
		})
		.catch((err) => {
			logger.error(
				`Onboarding status change was not successfully handled`,
				err,
			);
		});
}

export function attachNotifyListeners(notifier: Notifier) {
	// We want to deal with the window manager, so wrap the handler and pass
	// that along
	notifier.listen("config.onboarding", (_, finished: boolean) =>
		finishOnboarding(notifier.windowManager, finished),
	);
}
