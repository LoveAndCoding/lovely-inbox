import { BrowserWindowConstructorOptions } from "electron";

import logger from "../logger";
import LovelyWindow from "./base.window";
import OnboardingWindow from "./onboard.window";

export default class WindowManager {
	private windows: LovelyWindow[];
	private mainWindow: LovelyWindow;

	constructor(readonly inboxUrl: string, readonly onboardingUrl: string) {
		this.windows = [];
	}

	public create(url: string, WindowClass: LovelyWindow): LovelyWindow;
	public create(
		url: string,
		WindowClass: LovelyWindow,
		optionsOverrides: BrowserWindowConstructorOptions,
	): LovelyWindow {
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

	public openInbox() {
		this.setMainWindow(this.create(this.inboxUrl, LovelyWindow));
	}

	public openOnboarding() {
		this.setMainWindow(this.create(this.onboardingUrl, OnboardingWindow));
	}

	private setMainWindow(
		window: LovelyWindow,
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