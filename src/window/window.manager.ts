import { BrowserWindowConstructorOptions } from "electron";

import { ApplicationConfig } from "../config";
import logger from "../logger";
import Notifier from "../notify/notifier";
import Router from "../route/router";
import LovelyWindow from "./base.window";
import OnboardingWindow from "./onboard.window";

export default class WindowManager {
	private windows: LovelyWindow[];
	private mainWindow: LovelyWindow;
	public persistApp = false;

	constructor(
		public readonly router: Router,
		public readonly notifier: Notifier,
	) {
		this.windows = [];
	}

	/**
	 *
	 *
	 * @param persistApp {boolean} Should the app still be running after
	 */
	public closeAllWindows(persistApp = false) {
		// Clone the array so we can loop through without issue
		const oldPersist = this.persistApp;
		this.persistApp = persistApp;
		const wins = Array.from(this.windows);
		logger.debug("Closing all windows");
		// Start at the last (top-most) window and close them in reverse
		for (var i = wins.length - 1; i >= 0; i--) {
			wins[i].close();
	}
		this.persistApp = oldPersist;
	}

	public create<T extends LovelyWindow>(
		url: string,
		WindowClass: new (options: BrowserWindowConstructorOptions) => T,
		optionsOverrides?: BrowserWindowConstructorOptions,
	): T {
		const window = new WindowClass(optionsOverrides);

		window.browserWindow.loadURL(url);

		this.windows.push(window);
		window.browserWindow.once("closed", () => {
			const idx = this.windows.indexOf(window);
			if (idx < 0) {
				logger.warn("Closed window not found in WindowManager");
			} else {
				this.windows.splice(idx, 1);
			}
		});

		return window;
	}

	public hasMainWindow() {
		return !!this.mainWindow;
	}

	public openInbox() {
		this.setMainWindow(
			this.create(ApplicationConfig.entrypoints.main, LovelyWindow),
		);
	}

	public openOnboarding() {
		this.setMainWindow(
			this.create(
				ApplicationConfig.entrypoints.onboarding,
				OnboardingWindow,
			),
		);
	}

	private setMainWindow<T extends LovelyWindow>(
		window: T,
		subWindowsCloseToo: boolean = true,
	) {
		this.mainWindow = window;
		window.browserWindow.once("closed", () => {
			if (window === this.mainWindow) {
				this.mainWindow = null;
				if (subWindowsCloseToo) {
					this.windows.forEach((w) => w.close());
				}
			}
		});
	}
}
