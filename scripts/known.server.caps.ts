import IMAP from "../src/server/imap.connection";
import { KNOWN_CONFIGURATIONS } from "../src/server/known.configurations";

const processed = new Set<string>();

KNOWN_CONFIGURATIONS.forEach((conf, domain) => {
	if (processed.has(conf.incoming.server.host)) {
		return;
	}

	processed.add(conf.incoming.server.host);
	console.log(`Start connection test for ${domain}`);
	try {
		const conn = new IMAP({
			autoReconnect: false,
			host: conf.incoming.server.host,
			port: conf.incoming.server.port,
			tls: true,
			user: `lovely@${domain}`,
		});
		conn.testConnection()
			.then((results: false | string[]) => {
				console.log(
					`Capabilities for ${domain}:\n${JSON.stringify(results)}`,
				);
			})
			.catch((e: Error) => {
				console.error(
					`Error trying to fetch capabilities for ${domain}`,
				);
				console.error(e);
			});
	} catch (e) {
		console.error(`Error initializing connection test for ${domain}`);
		console.error(e);
	}
});
