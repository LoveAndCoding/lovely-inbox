import Storage from "./storage";

/**
 * EphemeralStorage
 *
 * Ephemeral storage is the most basic of storage types and is cleared any time
 * memory is wiped. Values here should be transactional and should not be
 * relied on for long term information retrieval.
 */
export default class EphemeralStorage<T> extends Storage<T> {
	private readonly storage: Map<keyof T, any>;

	constructor(name: string) {
		super(`In Memory Storage ${name}`);
		this.storage = new Map();
	}

	public save<K extends keyof T, V extends T[K]>(key: K, value: V) {
		this.storage.set(key, value);
		return this.storage.has(key);
	}

	public delete<K extends keyof T>(key: K) {
		this.storage.delete(key);
		return !this.storage.has(key);
	}

	public get<K extends keyof T, V extends T[K]>(key: K, defaultValue: V): V {
		return this.storage.has(key)
			? (this.storage.get(key) as V)
			: defaultValue;
	}

	public clear() {
		this.storage.clear();
		return this.storage.size === 0;
	}
}
