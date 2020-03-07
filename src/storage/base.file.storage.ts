import * as fs from "fs";
import * as path from "path";

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
	protected localCache: Map<keyof T, any>;
	protected readonly filename: string;
	protected readonly path: string;

	constructor(name: string, type: StorageTypes = StorageTypes.Data) {
		name = name.slice(0, 32).replace(/[^0-9a-z]/gi, "_");
		super(`File Storage ${name}`);

		this.localCache = new Map();
		this.filename = name + ".json";

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

	public delete<K extends keyof T>(key: K) {
		this.localCache.delete(key);
		return this.writeCacheToDisk();
	}

	public clear(): Promise<boolean> {
		this.localCache.clear();
		return this.writeCacheToDisk();
	}

	/**
	 * rebuild
	 *
	 * Because rebuild is called when we initially spin up
	 */
	protected rebuildSync() {
		try {
			const contents = fs.readFileSync(this.path, { encoding: "utf8" });
			const json = JSON.parse(contents) as T;
			for (const key in json) {
				if (Object.prototype.hasOwnProperty.call(json, key)) {
					this.localCache.set(key, json[key]);
				}
			}
		} catch (e) {
			logger.warn(
				`Unable to rebuild contents of ${this.name} from ${this.path}`,
			);
		}
	}

	protected writeCacheToDisk(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			fs.writeFile(
				this.path,
				JSON.stringify(this.localCache),
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
