import { ipcMain, IpcMainEvent } from "electron";

import { IServerNotifyChannels } from "../common/notify.channels";
import logger from "../logger";
import WindowManager from "../window/window.manager";

export default class Notifier {
	public windowManager: WindowManager;

	public listen<
		T extends keyof IServerNotifyChannels,
		K extends IServerNotifyChannels[T]
	>(channel: T, listener: (event: IpcMainEvent, ...args: K) => void) {
		logger.debug(`Adding IPC Notification Listener for channel ${channel}`);
		ipcMain.addListener(channel, listener);
	}

	public stopListening<
		T extends keyof IServerNotifyChannels,
		K extends IServerNotifyChannels[T]
	>(channel: T, listener: (event: IpcMainEvent, ...args: K) => void) {
		logger.debug(
			`Removing IPC Notification Listener for channel ${channel}`,
		);
		ipcMain.removeListener(channel, listener);
	}
}
