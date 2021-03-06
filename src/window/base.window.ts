import {
	BrowserWindow,
	BrowserWindowConstructorOptions,
	ipcMain,
	IpcMainEvent,
	nativeImage,
} from "electron";
import * as path from "path";

import { IServerNotifyChannels } from "../common/notify.channels";
import logger from "../logger";

import WindowPreloadScript from "file-loader!./window.preload.js";
import icon from "images/icon.light.red@2x.png";

// NOTE: We cannot extend BrowserWindow, so we basically just implement a small
// wrapper class with only the calls we need
// SEE:
//   - https://github.com/electron/electron/issues/23
//   - https://github.com/electron/electron/issues/8898
export default class LovelyWindow {
	public get defaultWindowOptions(): BrowserWindowConstructorOptions {
		return {
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
		};
	}

	public readonly browserWindow: BrowserWindow;
	protected ipcListeners: Map<
		string,
		// `any` type here matches what is expected for the IPC listener
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		((event: IpcMainEvent, ...args: any[]) => void)[]
	>;

	public constructor(options: BrowserWindowConstructorOptions) {
		options = Object.assign({}, this.defaultWindowOptions, options);

		this.browserWindow = new BrowserWindow(options);
		this.ipcListeners = new Map<
			string,
			// `any` type here matches what is expected for the IPC listener
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			((event: IpcMainEvent, ...args: any[]) => void)[]
		>();

		this.init();
	}

	public close(): void {
		this.browserWindow.close();
	}

	public onMsg<
		T extends keyof IServerNotifyChannels,
		K extends IServerNotifyChannels[T],
	>(
		name: T,
		callback: (event: IpcMainEvent, ...args: K) => void,
	): (event: IpcMainEvent, ...args: K) => void {
		logger.debug(
			`Adding ${name} IPC listener from ${this.constructor.name}`,
		);
		const wrappedCB = (event: IpcMainEvent, ...args: K) => {
			if (this.browserWindow.webContents === event.sender) {
				return callback(event, ...args);
			}
		};

		if (!this.ipcListeners.has(name)) {
			this.ipcListeners.set(name, []);
		}

		this.ipcListeners.get(name).push(wrappedCB);
		ipcMain.on(name, wrappedCB);
		return wrappedCB;
	}

	public offMsg(name: string, callback: (event: IpcMainEvent) => void): void {
		logger.debug(
			`Removing ${name} IPC listener from ${this.constructor.name}`,
		);
		const listeners = this.ipcListeners.get(name) || [];
		const idx = listeners.indexOf(callback);
		if (idx < 0) {
			logger.warn(
				`Potential Memory Leak: Unable to remove "${name}" IPC listener. Make sure the wrapped callback function is being passed in`,
			);
		} else {
			listeners.splice(idx, 1);
			ipcMain.off(name, callback);
			this.ipcListeners.set(name, listeners);
		}
	}

	public removeAllMsgListeners(name?: string): void {
		if (typeof name === "string") {
			if (!this.ipcListeners.has(name)) {
				logger.info(
					`Tried to remove IPC listeners for ${name} but no listeners were found`,
				);
				return;
			}

			logger.debug(
				`Removing all ${name} IPC listener from ${this.constructor.name}`,
			);
			ipcMain.removeAllListeners(name);
			this.ipcListeners.delete(name);
		} else {
			logger.debug(
				`Removing all IPC listener from ${this.constructor.name}`,
			);
			const names = this.ipcListeners.keys();
			for (const n of names) {
				ipcMain.removeAllListeners(n);
				this.ipcListeners.delete(n);
			}
		}
	}

	protected init(): void {
		// Always listen for minimize events
		const minimize = () => this.browserWindow.minimize();
		this.onMsg("window.minimize", minimize);

		this.browserWindow.once("closed", () => {
			// Clean up all the listeners on close
			this.removeAllMsgListeners();
		});
	}
}
