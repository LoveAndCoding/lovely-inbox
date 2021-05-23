import { IpcMainInvokeEvent } from "electron";

import { AccountManager } from "./";
import { IAccountProperties } from "../common/account";
import { IEmailProperties } from "../common/email";
import { IServerConfig } from "../common/server.config";
import Router from "../route/router";

async function createAccount(
	event: IpcMainInvokeEvent,
	serverConfig: IServerConfig,
	email: IEmailProperties,
): Promise<IAccountProperties | void> {
	const acct = await AccountManager.createAccount(serverConfig, email);
	return !acct ? null : acct.portableProps;
}

export function attachHandlers(router: Router): void {
	router.addHandler("/account/create", createAccount);
}
