import { ipcMain, IpcMessageEvent } from "electron";

import logger from "./logger";

/**
 * Setup Unhandled Error Listeners
 *
 * Setup the default handlers for uncaught excpetions and unhandled promise
 * rejections. For each, we need to do two things:
 *
 * 1. Log the error so that we can keep track of it
 * 2. Report it to the UI so that we can display it to the user
 */
export default function setupUnhandledListeners() {
	process.on("uncaughtException", (err: Error) => {
		logger.error("There was an uncaught error");
		logger.error(
			err.stack || `${err.fileName}#${err.lineNumber} ${err.message}`,
		);
		ipcMain.emit("uncaught-exception", err);
	});

	process.on("unhandledRejection", (err: Error) => {
		logger.error("There was an unhandled promise rejection");
		logger.error(
			err.stack || `${err.fileName}#${err.lineNumber} ${err.message}`,
		);
		ipcMain.emit("unhandled-promise-rejection", err);
	});
}
