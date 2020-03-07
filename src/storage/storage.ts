import { NameInUseError } from "./errors";

const USED_NAMES: Set<string> = new Set();

/**
 * Storage (Abstract)
 *
 * Storage is an abstract class that covers the basic operations needed for all
 * storage implementations. Each implementation will need to implement each of
 * these functions to properly store data.
 */
export default abstract class Storage<T> {
	public readonly name: string;

	/**
	 * Creates a new Storage container
	 *
	 * @param name Name of the storage container
	 */
	constructor(name: string) {
		if (USED_NAMES.has(name)) {
			throw new NameInUseError(name);
		}

		USED_NAMES.add(name);
		this.name = name;
	}

	public abstract save<K extends keyof T, V extends T[K]>(
		key: K,
		value: V,
	): boolean | Promise<boolean>;
	public abstract delete<K extends keyof T>(
		key: K,
	): boolean | Promise<boolean>;
	public abstract get<K extends keyof T, V extends T[K]>(
		key: K,
		defaultValue: V,
	): V | Promise<V>;
	public abstract clear(): boolean | Promise<boolean>;
}
