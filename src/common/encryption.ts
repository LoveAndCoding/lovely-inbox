import * as crypto from "crypto";

import * as keytar from "keytar";
import { isNullOrUndefined } from "util";

const KEYCHAIN_SERVICE_NAME = "LovelyInbox";

export async function generateSecureRandomKey(
	size: number = 256,
): Promise<string> {
	return new Promise((resolve, reject) => {
		crypto.randomBytes(size, (err, buff) => {
			if (err) {
				return reject(err);
			}

			let randomStr = "";
			try {
				randomStr = buff.toString("hex");
			} catch (e) {
				return reject(e);
			}
			if (!randomStr) {
				return reject(
					new Error(
						`Random Key of size ${size} could not be created`,
					),
				);
			}
			resolve(randomStr);
		});
	});
}

export async function getKeychainSecret(key: string) {
	let secret = await keytar.getPassword(KEYCHAIN_SERVICE_NAME, key);
	if (isNullOrUndefined(secret)) {
		secret = await generateSecureRandomKey();
		await keytar.setPassword(KEYCHAIN_SERVICE_NAME, key, secret);
	}
	return secret;
}

export async function encryptTextValue(
	toEncrypt: string,
	keychainLookupKey: string,
) {
	const iv = await generateSecureRandomKey(64);
	const keychainSecret = await getKeychainSecret(keychainLookupKey);
	const cipher = crypto.createCipheriv("aes-256-cbc", keychainSecret, iv);
	let encrypted = cipher.update(toEncrypt, "utf8", "hex");
	encrypted += cipher.final("hex");
	return iv + "$" + encrypted;
}

export async function decryptTextValue(
	toDecrypt: string,
	keychainLookupKey: string,
) {
	const [iv, encryptedContent] = toDecrypt.split("$");
	const keychainSecret = await getKeychainSecret(keychainLookupKey);
	const cipher = crypto.createDecipheriv("aes-256-cbc", keychainSecret, iv);
	let decrypted = cipher.update(encryptedContent, "hex", "utf8");
	decrypted += cipher.final("utf8");
	return decrypted;
}
