const { ipcRenderer } = require("electron");

console.log("here 1");
process.once("loaded", () => {
	console.log("here 2");
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
