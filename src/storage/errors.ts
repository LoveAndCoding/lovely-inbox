export class NameInUseError implements Error {
	constructor(name: string) {
		super(`The name "${name} is already in use and cannot be used again`);
	}
}
