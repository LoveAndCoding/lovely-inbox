import BaseFileStorage from "./base.file.storage";
import { InvalidStateError } from "../common/errors";

export { StorageTypes } from "./base.file.storage";

/**
 * FileStorage
 *
 * File storage is the most stable and long term storage option, however it is
 * also the slowest. This should not be used transactionally and instead should
 * be reserved for cases when long term storage is needed, and access is
 * infrequent or does not need to be fast.
 *
 * Whenever possible, these files should be kept small. Loading and saving
 * larger files takes more time and will cause us to be slower on startup.
 */
export default class FileStorage<T> extends BaseFileStorage<T> {
	public save<K extends keyof T, V extends T[K]>(key: K, value: V) {
		this.localCache.set(key, value);
		return this.writeCacheToDisk();
	}

	public get<K extends keyof T, V extends T[K]>(key: K, defaultValue: V): V {
		if (this.destroyed) {
			throw new InvalidStateError(
				"Cannot get from storage. Storage has already been destroyed and deleted",
			);
		}

		if (!this.localCache.has(key)) {
			return defaultValue;
		}
		return this.localCache.get(key) as V;
	}
}
