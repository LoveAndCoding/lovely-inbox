import { app, BrowserWindow, Tray } from "electron";

import { Config } from "./config";
import icons from "../images/icons.ico";

let mainWindow: Electron.BrowserWindow;
let mainWindowTrayIcon: Electron.Tray;

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		height: 700,
		width: 1000,
		title: "Lovely Inbox",
	});

	// Create the tray icon
	// mainWindowTrayIcon = new Tray(icons);

	// and load the index.html of the app.
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

	// Emitted when the window is closed.
	mainWindow.on("closed", () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On OS X it"s common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});
