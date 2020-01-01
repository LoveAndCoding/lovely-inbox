export class InvalidEmailAddressError extends Error {
	constructor(address: string) {
		super(`Invalid email address: ${address}`);
	}
}

export class IPCRequestTimeoutError extends Error {
	constructor(public readonly channel: string) {
		super(`IPCRequest timed out while making a request to "${channel}"`);
	}
}
