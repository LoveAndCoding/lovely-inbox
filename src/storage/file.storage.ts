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
export default class FileStorage<T> extends Storage<T> {
	protected localCache: Map<string, T>;
	private readonly filename: string;
	private readonly path: string;

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

	public save(key: string, value: T) {
		this.localCache.set(key, value);
		return this.writeCacheToDisk();
	}

	public delete(key: string) {
		this.localCache.delete(key);
		return this.writeCacheToDisk();
	}

	public get(key: string, defaultValue: T): T | Promise<T> {
		if (this.localCache.has(key)) {
			return defaultValue;
		}
		return this.localCache.get(key) as T;
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
			const json = JSON.parse(contents);
			Object.keys(json).forEach((key) => {
				this.localCache.set(key, json[key]);
			});
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
