import * as keytar from "keytar";

import { decryptTextValue, encryptTextValue } from "../common/encryption";
import FileStorage, { StorageTypes } from "./file.storage";

const SECURE_STORAGE_KEY_NAME = "LTS Tokens";

export default class SecureStorage extends FileStorage {
	constructor(name: string, type: StorageTypes = StorageTypes.Data) {
		super(name, type);
	}

	public save(key: string, value: string) {
		return this.encrypt(value).then((encryptedVal) => {
			this.localCache[key] = encryptedVal;
			return this.writeCacheToDisk();
		});
	}

	public get(key: string): Promise<string> | void;
	public get(key: string, defaultValue: string): Promise<string> {
		// Check for not in, since we may still want to return empty strings
		if (!key in this.localCache) {
			// While I can't imagine a scenario where a default value makes
			// sense for what we'd like to encrypt, included anyway just in case
			return typeof defaultValue !== "undefined"
				? Promise.resolve(defaultValue)
				: defaultValue;
		}

		// An empty string doesn't need to be decrypted, just return
		if (!this.localCache[key]) {
			return Promise.resolve(this.localCache[key] as string);
		}

		return this.decrypt(this.localCache[key]);
	}

	private encrypt(value: string) {
		return encryptTextValue(value, SECURE_STORAGE_KEY_NAME);
	}

	private decrypt(value: string) {
		return decryptTextValue(value, SECURE_STORAGE_KEY_NAME);
	}
}
