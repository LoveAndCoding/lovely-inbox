/**
 * IPC Message Handlers
 */
import { IpcMainInvokeEvent } from "electron";

import { IServerConfig } from "../common/server.config";
import Router from "../route/router";

const INCOMING_SUB_DOMAIN_GUESSES = ["mail", "imap", "email"];
const OUTGOING_SUB_DOMAIN_GUESSES = ["smtp", "mail", "email"];
const IMAP_PORT_GUESSES = [993];

export function guessAtConfig(
	event: IpcMainInvokeEvent,
	email: string,
): Promise<IServerConfig> {
	return Promise.resolve({
		incoming: {
			protocol: "imap",
			server: {
				host: "example.com",
				port: 993,
				ssl: true,
			},
		},
		outgoing: {
			protocol: "smtp",
			server: {
				host: "example.com",
				port: 25,
				ssl: true,
			},
		},
	});
}

export function attachHandlers(router: Router) {
	router.addHandler("/account/server/settings/guess", guessAtConfig);
}
