import { decryptTextValue, encryptTextValue } from "../common/encryption";
import { InvalidStateError } from "../common/errors";
import BaseFileStorage from "./base.file.storage";

export { StorageTypes } from "./base.file.storage";

const SECURE_STORAGE_KEY_NAME = "LTS Tokens";

export default class SecureStorage<T extends string> extends BaseFileStorage<
	Record<T, string>
> {
	public async save(key: T, value: string): Promise<boolean> {
		let encryptedVal = value;
		if (typeof value === "string") {
			encryptedVal = await this.encrypt(value);
		}

		this.localCache.set(key, encryptedVal);
		return this.writeCacheToDisk();
	}

	public async get<V extends string>(key: T, defaultValue: V): Promise<V> {
		if (this.destroyed) {
			throw new InvalidStateError(
				"Cannot get from secure storage. Storage has already been destroyed and deleted",
			);
		}

		// Check for not in, since we may still want to return empty strings
		if (this.localCache.has(key)) {
			// While I can't imagine a scenario where a default value makes
			// sense for what we'd like to encrypt, included anyway just in case
			return defaultValue;
		}

		// An empty string doesn't need to be decrypted, just return
		let val: string = this.localCache.get(key);
		if (typeof val === "string" && val !== "") {
			val = await this.decrypt(val);
		}

		// TS needs the generic even though it's always a string
		return val as V;
	}

	private async encrypt(value: string) {
		return await encryptTextValue(value, SECURE_STORAGE_KEY_NAME);
	}

	private async decrypt(value: string) {
		return await decryptTextValue(value, SECURE_STORAGE_KEY_NAME);
	}
}
