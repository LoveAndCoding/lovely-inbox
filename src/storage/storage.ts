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

	public abstract save(key: string, value: T): boolean | Promise<boolean>;
	public abstract delete(key: string): boolean | Promise<boolean>;
	public abstract get(key: string, defaultValue: T): T | Promise<T>;
	public abstract clear(): boolean | Promise<boolean>;
}
