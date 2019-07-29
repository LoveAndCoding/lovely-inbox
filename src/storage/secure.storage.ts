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
	private encrypt(value: string) {
		return encryptTextValue(value, SECURE_STORAGE_KEY_NAME);
	}

	private decrypt(value: string) {
		return decryptTextValue(value, SECURE_STORAGE_KEY_NAME);
	}
}
