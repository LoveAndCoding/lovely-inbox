import * as AppDirectory from "appdirectory";
import * as path from "path";
import * as winston from "winston";

import { Config } from "./config";

export default winston.createLogger({
	transports: [
		Config.isDev
			? new winston.transports.Console()
			: new winston.transports.File({
					filename: path.join(Config.directories.logs, "error.log"),
					level: "error",
			  }),
	],
});
