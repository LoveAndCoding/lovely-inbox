import {
	app,
	BrowserWindow,
	BrowserWindowConstructorOptions,
	ipcMain,
	IpcMessageEvent,
	nativeImage,
} from "electron";
import * as path from "path";

import * as WindowPreloadScript from "file-loader!./window.preload.js";
import * as icon from "../images/icon.light.red@2x.png";
import { ApplicationConfig } from "./config";
import logger from "./logger";

export default class WindowManager {
	private windows: BrowserWindow[];
	private mainWindow: BrowserWindow;

	constructor(readonly inboxUrl: string, readonly onboardingUrl: string) {
		this.windows = [];
	}

	public create(url: string): BrowserWindow;
	public create(
		url: string,
		options: BrowserWindowConstructorOptions,
	): BrowserWindow {
		options = Object.assign(
			{
				height: 720,
				icon: nativeImage.createFromDataURL(icon),
				title: "Lovely Inbox",
				webPreferences: {
					contextIsolation: true,
					enableRemoteModule: false,
					nodeIntegration: false,
					preload: path.join(__dirname, WindowPreloadScript),
					sandbox: true,
				},
				width: 1280,
			},
			options,
		);
		const window = new BrowserWindow(options);

		window.loadURL(url);

		this.windows.push(window);
		const minimize = (event: IpcMessageEvent) => {
			if (window.webContents === event.sender) {
				window.minimize();
			}
		};
		ipcMain.on("window-minimize", minimize);
		window.on("closed", () => {
			ipcMain.removeListener("window-minimize", minimize);
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
				transparent: true,
				width: 950,
			},
		));
		this.mainWindow.on("closed", () => {
			if (onBoardingWindow === this.mainWindow) {
				this.mainWindow = null;
			}
		});
	}
}
