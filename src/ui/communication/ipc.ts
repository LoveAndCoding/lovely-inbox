import { IpcMainInvokeEvent } from "electron";

import { IPCRequestTimeoutError } from "../../common/errors";
import { IRouteHandler } from "../../common/route.signatures";
import { Tail } from "../../common/types";

type IPCResponse =
	| {
			requestId: number;
			error: any;
	  }
	| {
			requestId: number;
			results: any;
	  };

// This repsonse error does not need to be shared so it is in this file
class IPCResponseError extends Error {
	constructor(public readonly reason: any) {
		if (typeof reason === "string") {
			super(reason);
		} else {
			super("Unknown IPC Response Error");
		}
	}
}

/**
 * Notify the main thread of an action. These notifications should not need a
 * reply. If you need to make a request and get a reply, please use `request`.
 *
 * @param channel IPC channel where listeners will be notified
 * @param args Any additional arguments or data listeners may expect
 */
export function notify(channel: string, ...args: any) {
	window.postMessage(
		{
			args,
			channel,
			type: "ipcNotify",
		},
		"*",
	);
}

let nextIPCRequestId = 1;
/**
 * Make a request to the main thread on the specified route. This request will
 * be sent to the main thread and a Promise will be returned with the results of
 * the request. Each route may require different parameters and return different
 * results, so please reference the route list or autocomplete for more info.
 *
 * For a list of routes, refer to src/common/route.signatures.ts
 *
 * @param url IPC route to request. Called URL for parity with server requests
 * @param args The arguments that this route expects. When autocomplete is supported, the arguments for the route you're calling should be shown
 * @returns Promise<mixed> The results of the request
 */
export function request<
	/*
		These types are a bit wild. The goal of these types is type checking
		against the route signatures we expect. This way, we can us TS safety to
		make sure we're never calling a route that doesn't exist, and we know
		what parameters that route expects.

		In practice it's a pretty neat way to ensure that we are calling our API
		correctly everywhere, and have autocomplete in the IDE when available.

		But it's messy! The first parameter simply is doing a match against our
		expected routes using `keyof`. The second one is finding out what the
		parameters are to that route handler so we can make sure we're passing
		in the right values. However, because we using IPC communication, the
		first parameter is always the IPC event object, which we do not need to
		pass in. To solve for that, `Tail<>` removes that first parameter so we
		have the actual list that we should pass in.
	*/
	T extends keyof IRouteHandler,
	K extends Tail<Parameters<IRouteHandler[T]>>
>(url: T, ...args: K): ReturnType<IRouteHandler[T]> {
	return new Promise((resolve, reject) => {
		const requestId = nextIPCRequestId++;
		// Check if the response we get is the one we're waiting for
		const checkResponse = (event: Event) => {
			const msg: IPCResponse | void = event.detail;

			if (msg && msg.requestId === requestId) {
				// We got a response, remove the listener and resolve
				window.removeEventListener("ipcResponse", checkResponse);
				if (typeof msg.error === "undefined") {
					resolve(msg.result);
				} else {
					reject(new IPCResponseError(msg.error));
				}
			}
		};

		// Timeout the request if we don't get a response in 30 seconds
		const tmr = setTimeout(() => {
			window.removeEventListener("ipcResponse", checkResponse);
			reject(new IPCRequestTimeoutError(url));
		}, 30000);

		window.addEventListener("ipcResponse", checkResponse);

		requestId++;
		window.postMessage(
			{
				args,
				url,
				requestId,
				type: "ipcRequest",
			},
			"*",
		);
	});
}
