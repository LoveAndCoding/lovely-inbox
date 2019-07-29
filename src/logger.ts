import * as AppDirectory from "appdirectory";
import * as path from "path";
import * as winston from "winston";

import { ApplicationConfig } from "./config";

export default winston.createLogger({
	transports: [
		ApplicationConfig.isDev
			? new winston.transports.Console()
			: new winston.transports.File({
					filename: path.join(
						ApplicationConfig.directories.logs,
						"error.log",
					),
					level: "error",
			  }),
	],
});
