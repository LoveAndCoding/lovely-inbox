export class InvalidEmailAddressError extends Error {
	constructor(address: string) {
		super(`Invalid email address: ${address}`);
	}
}
