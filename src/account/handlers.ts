import { IpcMainInvokeEvent } from "electron";

import { AccountManager } from "./";
import { IAccountProperties } from "../common/account";
import { IServerConfig } from "../common/server.config";
import Router from "../route/router";

async function createAccount(
	event: IpcMainInvokeEvent,
	serverConfig: IServerConfig,
): Promise<IAccountProperties> {
	const acct = await AccountManager.createAccount(serverConfig);
	return acct.portableProps;
}

export function attachHandlers(router: Router): void {
	router.addHandler("/account/create", createAccount);
}
