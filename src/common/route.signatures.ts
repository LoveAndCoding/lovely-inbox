import { IpcMainInvokeEvent } from "electron";

import { IAccountProperties } from "./account";
import { IEmailProperties } from "./email";
import { IServerConfig } from "./server.config";

export interface IRouteHandler {
	"/account/create": (
		event: IpcMainInvokeEvent,
		config: IServerConfig,
		email: IEmailProperties,
	) => IAccountProperties;

	"/account/server/settings/guess": (
		event: IpcMainInvokeEvent,
		email: string,
	) => IServerConfig;

	"/auth/plain/submit": (
		event: IpcMainInvokeEvent,
		id: number,
		password: string,
		save: boolean,
	) => boolean;
}
