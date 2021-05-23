import { BrowserWindowConstructorOptions } from "electron";
import { URLSearchParams } from "url";

import { ApplicationConfig } from "../config";
import logger from "../logger";
import Notifier from "../notify/notifier";
import Router from "../route/router";
import LovelyWindow from "./base.window";
import ModalWindow from "./modal.window";
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
		notifier.windowManager = this;
	}

	/**
	 *
	 *
	 * @param persistApp {boolean} Should the app still be running after
	 */
	public closeAllWindows(persistApp = false): void {
		// Clone the array so we can loop through without issue
		const oldPersist = this.persistApp;
		this.persistApp = persistApp;
		const wins = Array.from(this.windows);
		logger.debug("Closing all windows");
		// Start at the last (top-most) window and close them in reverse
		for (let i = wins.length - 1; i >= 0; i--) {
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

	public hasMainWindow(): boolean {
		return !!this.mainWindow;
	}

	public openInbox(): void {
		this.setMainWindow(
			this.create(ApplicationConfig.entrypoints.main, LovelyWindow),
		);
	}

	public openOnboarding(): void {
		this.setMainWindow(
			this.create(
				ApplicationConfig.entrypoints.onboarding,
				OnboardingWindow,
			),
		);
	}

	public popupModal<T extends ModalWindow>(
		modalClass: {
			new (options: BrowserWindowConstructorOptions): T;
			url: string;
		},
		parameters?: NodeJS.Dict<string | string[]>,
	): T {
		const queryParams = new URLSearchParams(parameters || {});
		return this.create(
			`${modalClass.url}?${queryParams.toString()}`,
			modalClass,
			{
				parent: this.mainWindow.browserWindow,
			},
		);
	}

	private setMainWindow<T extends LovelyWindow>(
		window: T,
		subWindowsCloseToo = true,
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
