import { BrowserWindowConstructorOptions } from "electron";

import LovelyWindow from "./base.window";

export default abstract class ModalWindow extends LovelyWindow {
	public get defaultWindowOptions(): BrowserWindowConstructorOptions {
		return Object.assign({}, super.defaultWindowOptions, {
			frame: false,
			fullscreenable: false,
			height: 260,
			maximizable: false,
			modal: true,
			resizable: false,
			transparent: true,
			width: 420,
		});
	}

	static get url(): string {
		throw new Error("Getter not implemented by subclass for URL");
	}
}
