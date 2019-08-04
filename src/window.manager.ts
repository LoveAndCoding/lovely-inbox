import { app, BrowserWindow, BrowserWindowConstructorOptions } from "electron";

import icon from "../images/icons.ico";
import { ApplicationConfig } from "./config";
import logger from "./logger";

interface IWindowOptions extends BrowserWindowConstructorOptions {}

export default class WindowManager {
	private windows: BrowserWindow[];
	private mainWindow: BrowserWindow;

	constructor(readonly inboxUrl: string, readonly onboardingUrl: string) {
		this.windows = [];
	}

	public create(url: string): BrowserWindow;
	public create(url: string, options: IWindowOptions): BrowserWindow {
		options = Object.assign(
			{
				height: 720,
				title: "Lovely Inbox",
				webPreferences: {
					nodeIntegration: true,
					enableRemoteModule: true,
				},
				width: 1280,
			},
			options,
		);
		const window = new BrowserWindow(options);

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
			{
				frame: false,
				fullscreenable: false,
				height: 600,
				maximizable: false,
				resizable: false,
				width: 600,
			},
		));
		this.mainWindow.on("closed", () => {
			if (onBoardingWindow === this.mainWindow) {
				this.mainWindow = null;
			}
		});
	}
}
