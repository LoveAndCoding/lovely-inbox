import * as keytar from "keytar";

import { decryptTextValue, encryptTextValue } from "../common/encryption";
import FileStorage, { StorageTypes } from "./file.storage";

const SECURE_STORAGE_KEY_NAME = "LTS Tokens";

export default class SecureStorage extends FileStorage<string | void> {
	constructor(name: string, type: StorageTypes = StorageTypes.Data) {
		super(name, type);
	}

	public async save(key: string, value: string | void) {
		let encryptedVal = value;
		if (typeof value === "string") {
			encryptedVal = await this.encrypt(value);
		}

		this.localCache.set(key, encryptedVal);
		return this.writeCacheToDisk();
	}

	public async get(
		key: string,
		defaultValue: string | void,
	): Promise<string | void> {
		// Check for not in, since we may still want to return empty strings
		if (this.localCache.has(key)) {
			// While I can't imagine a scenario where a default value makes
			// sense for what we'd like to encrypt, included anyway just in case
			return defaultValue;
		}

		// An empty string doesn't need to be decrypted, just return
		let val = this.localCache.get(key);
		if (typeof val === "string" && val !== "") {
			val = await this.decrypt(val);
		}

		return val;
	}

	private async encrypt(value: string) {
		return await encryptTextValue(value, SECURE_STORAGE_KEY_NAME);
	}

	private async decrypt(value: string) {
		return await decryptTextValue(value, SECURE_STORAGE_KEY_NAME);
	}
}
