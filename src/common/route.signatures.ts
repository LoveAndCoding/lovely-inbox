import { IpcMainInvokeEvent } from "electron";

import { IServerConfig } from "./server.config";

export interface IRouteHandler {
	"/account/server/settings/guess": (
		event: IpcMainInvokeEvent,
		email: string,
	) => IServerConfig;
}
