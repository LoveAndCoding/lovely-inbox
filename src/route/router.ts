import { ipcMain } from "electron";

import { IRouteHandler } from "../common/route.signatures";
import logger from "../logger";

export default class Router {
	private routes: Map<
		string,
		(
			...args: Parameters<IRouteHandler[keyof IRouteHandler]>
		) => Promise<ReturnType<IRouteHandler[keyof IRouteHandler]>>
	>;

	constructor() {
		this.routes = new Map();
	}

	public addHandler<
		T extends keyof IRouteHandler,
		K extends IRouteHandler[T],
	>(
		route: T,
		callback: (...args: Parameters<K>) => Promise<ReturnType<K>>,
	): void {
		logger.debug(`Adding IPC Handler for route ${route}`);
		this.routes.set(route, callback);
		ipcMain.handle(route, callback);
	}

	public removeHandler(route: keyof IRouteHandler): void {
		logger.debug(`Removing IPC Handler for route ${route}`);
		this.routes.delete(route);
		ipcMain.removeHandler(route);
	}

	public removeAllHandlers(): void {
		for (const route of this.routes.keys()) {
			ipcMain.removeHandler(route);
		}
		this.routes.clear();
	}
}
