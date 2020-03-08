import * as logform from "logform";
import * as path from "path";
import * as winston from "winston";

// NOTE(alexis): To bypass loading all of our config, which may use our logger,
// we load the ApplicationConfig directly
import { ApplicationConfig } from "./config/application";

const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.printf(
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
