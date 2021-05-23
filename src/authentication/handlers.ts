import { IpcMainInvokeEvent } from "electron";

import PlainAuthScheme from "./plain";
import Router from "../route/router";

async function plainPasswordSubmit(
	event: IpcMainInvokeEvent,
	id: number,
	password: string,
	save: boolean,
): Promise<boolean> {
	const hdlr = PlainAuthScheme.getHandler(id);
	if (!hdlr) {
		return false;
	}

	return await hdlr(password, save);
}

export function attachHandlers(router: Router): void {
	router.addHandler("/auth/plain/submit", plainPasswordSubmit);
}
