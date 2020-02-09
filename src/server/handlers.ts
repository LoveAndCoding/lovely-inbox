/**
 * IPC Message Handlers
 */
import { promises as dns } from "dns";
import { IpcMainInvokeEvent } from "electron";

import Email from "../common/email";
import { InvalidEmailAddressError } from "../common/errors";
import { CONFIG_SOURCE, IServerConfig } from "../common/server.config";
import IMAPConnection from "./imap.connection";
import lookupKnownConfiguration from "./known.configurations";
import Router from "../route/router";
import logger from "../logger";

const INCOMING_SUB_DOMAIN_GUESSES = ["mail", "imap", "email"];
const OUTGOING_SUB_DOMAIN_GUESSES = ["smtp", "mail", "email"];
const IMAP_PORT_GUESSES = [993];

async function checkMXRecordsForConfig(domain: string) {
	let mxRecords;
	try {
		mxRecords = await dns.resolveMx(domain);
	} catch (err) {
		// If we error, probably means we couldn't find it, just bail
		logger.info(`Error trying to lookup DNS record for domain ${domain}`);
		logger.debug(err);
		return;
	}

	mxRecords = mxRecords.sort((a, b) => a.priority > b.priority);
	for (const record of mxRecords) {
		// We want to strip out the sub-domain for this check
		// NOTE(alexis): this is a best guess and won't support MX domains like
		// .co.uk or similar two part TLDs. But this is a shortcut, so that's ok
		// for now.
		const mxDomain = (record.exchange || "")
			.split(".")
			.slice(-2)
			.join(".");
		const guessedConfig = lookupKnownConfiguration(mxDomain);
		if (guessedConfig) {
			return guessedConfig;
		}
	}
}

async function checkIncomingConfig(user: string, host: string, port: number) {
	let connection = new IMAPConnection({
		autotls: "always",
		host,
		port,
		tls: true,
		user,
	});
	logger.debug(
		`Testing for IMAP server at ${host}:${port} with user ${user}`,
	);
	const successful = await connection.testConnection();

	if (successful) {
		return {
			protocol: "imap",
			server: {
				host,
				port,
				tls: true,
			},
		};
	}
	// else don't return anything, we didn't find a config
}

export async function guessAtConfig(
	event: IpcMainInvokeEvent,
	email: string,
): IServerConfig {
	let parsedEmail;
	try {
		parsedEmail = new Email(email);
	} catch (e) {
		throw new InvalidEmailAddressError(email);
	}

	const domain = parsedEmail.domain.toLowerCase();

	let knownConfig = lookupKnownConfiguration(domain);

	if (knownConfig) {
		// If we found a known configuration, we can simply return
		logger.info(
			`Found known server configuration data for domain ${domain}`,
		);
		return {
			incoming: knownConfig.incoming,
			outgoing: knownConfig.outgoing,
			source: CONFIG_SOURCE.Known_Domain,
			username: knownConfig.getUsername
				? knownConfig.getUsername(email)
				: email,
		};
	}

	// Try to guess the configuration based on the DNS and our known configs
	knownConfig = await checkMXRecordsForConfig(domain);
	if (knownConfig) {
		logger.info(`Found known server configuration from dns for ${domain}`);
		return {
			incoming: knownConfig.incoming,
			outgoing: knownConfig.outgoing,
			source: CONFIG_SOURCE.Known_DNS,
			username: knownConfig.getUsername
				? knownConfig.getUsername(email)
				: email,
		};
	}

	// Finally, if we couldn't do that, we're gonna just start trying configs
	let guessedConfig: IServerConfig = {
		source: CONFIG_SOURCE.Guess,
		username: email,
	};

	for (const subdomain of INCOMING_SUB_DOMAIN_GUESSES) {
		for (const port of IMAP_PORT_GUESSES) {
			const fullDomain = subdomain ? `${subdomain}.${domain}` : domain;
			const workingConfig = await checkIncomingConfig(
				email,
				fullDomain,
				port,
			);
			if (workingConfig) {
				logger.info(
					`Got IMAP response from domain ${fullDomain}, guessing at configuration`,
				);
				guessedConfig.incoming = workingConfig;
				break;
			}
		}

		if (guessedConfig.incoming) {
			break;
		}
	}

	// If we couldn't guess either an incoming or outgoing config, the user will
	// need to fill in the gaps
	if (!guessedConfig.incoming || !guessedConfig.outgoing) {
		logger.info(
			`Unable to get a full configuration guess for domain ${domain}`,
		);
		guessedConfig.source = CONFIG_SOURCE.User;
	}

	return guessedConfig;
}

export function attachHandlers(router: Router) {
	router.addHandler("/account/server/settings/guess", guessAtConfig);
}
