import * as logform from "logform";
import * as path from "path";
import * as winston from "winston";

// NOTE(alexis): To bypass loading all of our config, which may use our logger,
// we load the ApplicationConfig directly
import { ApplicationConfig } from "./config/application";

// TODO(alexis): Due to a bug in how this is loaded, we have to load these
// logger formats manually
// tslint:disable-next-line:no-var-requires
const combine = require("logform/combine");
// tslint:disable-next-line:no-var-requires
const printf = require("logform/printf");
// tslint:disable-next-line:no-var-requires
const timestamp = require("logform/timestamp");

const logger = winston.createLogger({
	format: combine(
		timestamp(),
		printf(
			(log: logform.TransformableInfo) =>
				`${log.timestamp} [${log.level.toUpperCase()}]: ${log.message}`,
		),
	),
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

logger.debug("Logger Initialized");

export default logger;
