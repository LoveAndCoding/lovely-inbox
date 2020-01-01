import { ipcMain, IpcMainInvokeEvent } from "electron";

import { IRouteHandler } from "../common/route.signatures";
import logger from "../logger";

export default class Router {
	private routes: Map<string, Route>;

	constructor() {
		this.routes = new Map();
	}

	public addHandler<
		T extends keyof IRouteHandler,
		K extends IRouteHandler[T]
	>(route: T, callback: K) {
		logger.debug(`Adding IPC Handler for route ${route}`);
		this.routes.set(route, callback);
		ipcMain.handle(route, callback);
	}

	public removeHandler(route: keyof IRouteHandler) {
		logger.debug(`Removing IPC Handler for route ${route}`);
		this.routes.delete(route);
		ipcMain.removeHandler(route);
	}

	public removeAllHandlers() {
		const routes = this.routes.keys();
		routes.forEach((route) => {
			this.routes.delete(route);
			ipcMain.removeHandler(route);
		});
	}
}
