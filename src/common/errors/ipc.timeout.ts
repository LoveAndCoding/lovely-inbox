export class IPCRequestTimeoutError extends Error {
	constructor(public readonly channel: string) {
		super(`IPCRequest timed out while making a request to "${channel}"`);
	}
}
