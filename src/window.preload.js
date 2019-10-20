const { ipcRenderer } = require("electron");

process.once("loaded", () => {
	window.addEventListener("message", (event) => {
		if (event.source !== window) {
			return;
		}

		const msg = event.data || {};

		if (msg.type === "ipcRenderer") {
			ipcRenderer.send.apply(ipcRenderer, [msg.channel].concat(msg.args));
		}
	});
});
