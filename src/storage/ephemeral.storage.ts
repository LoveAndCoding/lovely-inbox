import Storage from "./storage";

/**
 * EphemeralStorage
 *
 * Ephemeral storage is the most basic of storage types and is cleared any time
 * memory is wiped. Values here should be transactional and should not be
 * relied on for long term information retrieval.
 */
export default class EphemeralStorage extends Storage<any> {
	private readonly storage: Map<string, any>;

	constructor(name: string) {
		super(`In Memory Storage ${name}`);
		this.storage = new Map();
	}

	public save(key: string, value: any) {
		this.storage.set(key, value);
		return this.storage.has(key);
	}

	public delete(key: string) {
		this.storage.delete(key);
		return !this.storage.has(key);
	}

	public get(key: string, defaultValue: any): any {
		return this.storage.has(key) ? this.storage.get(key) : defaultValue;
	}

	public clear() {
		this.storage.clear();
		return this.storage.size === 0;
	}
}
