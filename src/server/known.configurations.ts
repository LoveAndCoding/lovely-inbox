import {
	CONFIG_SOURCE
	IIncomingServerConfig,
	IOutgoingServerConfig,
	IServerConfig,
} from "../common/server.config";

export const KNOWN_CONFIGURATIONS: Map<string, IServerConfig> = new Map();

/**
 * Build incoming server config, based on the most common values
 */
function buildIncomingServerConfig(
	host: string,
	port = 993,
	ssl: true,
): IIncomingServerConfig {
	return {
		protocol: "imap",
		server: {
			host,
			port,
			ssl,
		},
	};
}

/**
 * Build outgoing server config, based on the most common values
 */
function buildOutgoingServerConfig(
	host: string,
	port = 587,
	tls = true,
	ssl = true,
): IOutgoingServerConfig {
	return {
		protocol: "smtp",
		server: {
			host,
			port,
			tls,
			ssl,
		},
	};
}

/**
 * =========================================
 * START KNOWN CONFIGURATIONS
 *
 * (CONFIGURATIONS LISTED ALPHABETICALLY)
 * =========================================
 */

/**
 * AOL
 */
KNOWN_CONFIGURATIONS.set("aol.com", {
	incoming: buildIncomingServerConfig("imap.aol.com"),
	outgoing: buildOutgoingServerConfig("smtp.aol.com", 465, false),
});

/**
 * COMCAST
 */
KNOWN_CONFIGURATIONS.set("comcast.net", {
	incoming: buildIncomingServerConfig("imap.comcast.net"),
	outgoing: buildOutgoingServerConfig("smtp.comcast.net"),
});

/**
 * GMAIL
 */
KNOWN_CONFIGURATIONS.set("gmail.com", {
	incoming: buildIncomingServerConfig("imap.gmail.com"),
	outgoing: buildOutgoingServerConfig("smtp.gmail.com"),
});
KNOWN_CONFIGURATIONS.set(
	"googlemail.com",
	KNOWN_CONFIGURATIONS.get("gmail.com"),
);
KNOWN_CONFIGURATIONS.set("google.com", KNOWN_CONFIGURATIONS.get("gmail.com"));

/**
 * OUTLOOK
 */
KNOWN_CONFIGURATIONS.set("outlook.com", {
	incoming: buildIncomingServerConfig("outlook.office365.com"),
	outgoing: buildOutgoingServerConfig("smtp.office365.com"),
});
KNOWN_CONFIGURATIONS.set("live.com", KNOWN_CONFIGURATIONS.get("outlook.com"));
[
	"be",
	"ca",
	"co.uk",
	"com",
	"com.ar",
	"com.br",
	"com.mx",
	"de",
	"es",
	"fr",
	"it",
].forEach((tld) =>
	KNOWN_CONFIGURATIONS.set(
		`hotmail.${tld}`,
		KNOWN_CONFIGURATIONS.get("outlook.com"),
	),
);
KNOWN_CONFIGURATIONS.set("msn.com", KNOWN_CONFIGURATIONS.get("outlook.com"));

/**
 * YAHOO
 */
KNOWN_CONFIGURATIONS.set("yahoo.com", {
	incoming: buildIncomingServerConfig("imap.mail.yahoo.com"),
	outgoing: buildOutgoingServerConfig("smtp.mail.yahoo.com"),
});
KNOWN_CONFIGURATIONS.set("yahoo.co.uk", KNOWN_CONFIGURATIONS.get("yahoo.com"));

/**
 * =========================================
 * END KNOWN CONFIGURATIONS
 * =========================================
 */

/**
 * Check our list of known configuration settings for the given domain
 *
 * @param domain Domain to lookup configuration for
 */
export default function lookupKnownConfiguration(
	domain: string,
): IServerConfig {
	return KNOWN_CONFIGURATIONS.get(domain);
}