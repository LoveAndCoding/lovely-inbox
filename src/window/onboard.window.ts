import {
	BrowserWindowConstructorOptions,
	ipcMain,
	IpcMessageEvent,
} from "electron";

import LovelyWindow from "./base.window";

export default class OnboardingWindow extends LovelyWindow {
	public get defaultWindowOptions(): BrowserWindowConstructorOptions {
		return Object.assign({}, super.defaultWindowOptions, {
			frame: false,
			fullscreenable: false,
			height: 600,
			maximizable: false,
			resizable: false,
			transparent: true,
			width: 950,
		});
	}

	public constructor(options: BrowserWindowConstructorOptions) {
		super(options);
	}
}
