import { BrowserWindowConstructorOptions } from "electron";

import { ApplicationConfig } from "../config";
import logger from "../logger";
import Router from "../route/router";
import LovelyWindow from "./base.window";
import OnboardingWindow from "./onboard.window";

export default class WindowManager {
	private windows: LovelyWindow[];
	private mainWindow: LovelyWindow;

	constructor(public readonly router: Router) {
		this.windows = [];
	}

	public create(
		url: string,
		WindowClass: typeof LovelyWindow,
		optionsOverrides?: BrowserWindowConstructorOptions,
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
