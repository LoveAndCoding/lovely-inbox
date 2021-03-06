import * as fs from "fs";
import * as path from "path";

import { InvalidStateError } from "../common/errors";
import { ApplicationConfig } from "../config";
import logger from "../logger";
import Storage from "./storage";

export enum StorageTypes {
	Cache,
	Config,
	Data,
	Logs,
}

/**
 * BaseFileStorage (Abstract)
 *
 * BaseFileStorage is an abstract class that covers common functionality between
 * all different kinds of file based storage. Each implementation still needs to
 * create a `save` and `get` method that should write to the localCache object.
 */
export default abstract class BaseFileStorage<T> extends Storage<T> {
	// We type-check this any everywhere we use it in the rest of the code, and
	// using T[Key] gets complicated. So keeping explicit any for simplicity
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected localCache: Map<keyof T, any>;
	protected readonly filename: string;
	protected readonly path: string;
	protected destroyed: boolean;

	constructor(name: string, type: StorageTypes = StorageTypes.Data) {
		name = name.slice(0, 32).replace(/[^0-9a-z]/gi, "_");
		super(`File Storage ${name}`);

		this.localCache = new Map();
		this.filename = name + ".json";
		this.destroyed = false;

		let filebase = "";
		switch (type) {
			case StorageTypes.Cache:
				filebase = ApplicationConfig.directories.cache;
				break;
			case StorageTypes.Config:
				filebase = ApplicationConfig.directories.config;
				break;
			case StorageTypes.Data:
				filebase = ApplicationConfig.directories.data;
				break;
			case StorageTypes.Logs:
				filebase = ApplicationConfig.directories.logs;
				break;
		}

		this.path = path.join(filebase, this.filename);
		this.rebuildSync();
	}

	public delete<K extends keyof T>(key: K): Promise<boolean> {
		this.localCache.delete(key);
		return this.writeCacheToDisk();
	}

	public clear(): Promise<boolean> {
		this.localCache.clear();
		return this.writeCacheToDisk();
	}

	public destroy(): Promise<boolean> {
		// We already deleted this storage, no-op
		if (this.destroyed) {
			return Promise.resolve(true);
		}

		this.destroyed = true;
		return new Promise((resolve) => {
			fs.unlink(this.path, () => {
				resolve(true);
			});
		});
	}

	/**
	 * rebuild
	 *
	 * Because rebuild is called when we initially spin up
	 */
	protected rebuildSync(): void {
		if (this.destroyed) {
			throw new InvalidStateError(
				"Cannot perform this operation. Storage has been destroyed and data erased",
			);
		}

		try {
			const contents = fs.readFileSync(this.path, { encoding: "utf8" });
			// TODO: We're loading in to JSON here and can't completely trust
			// that our data and typing match exactly what we need. Ideally we
			// would be able to check each key against the type we expect and
			// only import keys we have. However, that's not what this does.
			// For now, simply import through any. The impact of bad data is
			// errors elsewhere in the code, but it should be fixable through
			// diagnosis or regeneration.
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const jsonLoadedMap = new Map(JSON.parse(contents)) as any;
			for (const [key, val] of jsonLoadedMap) {
				this.localCache.set(key, val);
			}
		} catch (e) {
			logger.warn(
				`Unable to rebuild contents of ${this.name} from ${this.path}`,
			);
		}
	}

	protected writeCacheToDisk(): Promise<boolean> {
		if (this.destroyed) {
			throw new InvalidStateError(
				"Cannot perform this operation. Storage has been destroyed and data erased",
			);
		}

		logger.debug(`Writing ${this.name} configruation to ${this.path}`);

		return new Promise((resolve, reject) => {
			fs.writeFile(
				this.path,
				JSON.stringify(Array.from(this.localCache.entries())),
				{ encoding: "utf8" },
				(err) => {
					if (err) {
						return reject(err);
					}
					resolve(true);
				},
			);
		});
	}
}
