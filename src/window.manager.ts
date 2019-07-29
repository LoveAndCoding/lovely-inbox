import { app, BrowserWindow } from "electron";

import icon from "../images/icons.ico";
import { ApplicationConfig } from "./config";
import logger from "./logger";

interface IWindowOptions {
	title: string;
	width: number;
	height: number;
}

export default class WindowManager {
	private windows: BrowserWindow[];
	private mainWindow: BrowserWindow;

	constructor(readonly inboxUrl: string, readonly onboardingUrl: string) {
		this.windows = [];
	}

	public create(url: string): BrowserWindow;
	public create(url: string, options: WindowOptions): BrowserWindow {
		options = options || {};
		const window = new BrowserWindow({
			height: options.height || 720,
			icon,
			title: options.title || "Lovely Inbox",
			width: options.width || 1280,
		});

		window.loadURL(url);

		this.windows.push(window);
		window.on("closed", () => {
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
		const inboxWindow = (this.mainWindow = this.create(this.inboxUrl));
		this.mainWindow.on("closed", () => {
			if (inboxWindow === this.mainWindow) {
				this.mainWindow = null;
				// We're closing the main window, close all windows
				this.windows.forEach((window) => window.close());
			}
		});
	}

	public openOnboarding() {
		const onBoardingWindow = (this.mainWindow = this.create(
			this.onboardingUrl,
		));
		this.mainWindow.on("closed", () => {
			if (onBoardingWindow === this.mainWindow) {
				this.mainWindow = null;
			}
		});
	}
}
