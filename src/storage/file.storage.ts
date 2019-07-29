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
 * also the slowest. This should not be used transationally and instead should
 * be reserved for cases when long term storage is needed, and access is
 * infrequent or does not need to be fast.
 *
 * Whenever possible, these files should be kept small. Loading and saving
 * larger files takes more time and will cause us to be slower on startup.
 */
export default class FileStorage extends Storage {
	protected localCache: { [string]: any };
	private readonly filename: string;
	private readonly path: string;

	constructor(name: string, type: StorageTypes = StorageTypes.Data) {
		name = name.slice(0, 32).replace(/[^0-9a-z]/gi, "_");
		super(`File Storage ${name}`);

		this.localCache = Object.create(null);
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

	public save(key: string, value: any) {
		this.localCache[key] = value;
		return this.writeCacheToDisk();
	}

	public delete(key: string) {
		delete this.localCache[key];
		return this.writeCacheToDisk();
	}

	public get<T>(key: string): T {
		return this.localCache[key] as T;
	}

	/**
	 * rebuild
	 *
	 * Because rebuild is called at the beginning of the
	 */
	protected rebuildSync() {
		try {
			const contents = fs.readFileSync(this.path, { encoding: "utf8" });
			const json = JSON.parse(contents);
			Object.keys(json).forEach((key) => {
				this.localCache[key] = json[key];
			});
		} catch (e) {
			logger.warn(
				`Unable to rebuild contents of ${this.name} from ${this.path}`,
			);
		}
	}

	protected writeCacheToDisk() {
		return new Promise((resolve, reject) => {
			fs.writeFile(
				this.path,
				JSON.stringify(this.localCache),
				{ encoding: "utf8" },
				(err) => {
					if (err) {
						return reject(err);
					}
					resolve();
				},
			);
		});
	}
}
