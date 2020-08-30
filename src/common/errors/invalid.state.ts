export class InvalidStateError extends Error {
	constructor(msg: string) {
		super(`Invalid State: ${msg}`);
	}
}
