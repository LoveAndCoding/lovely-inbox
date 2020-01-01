const { ipcRenderer, webFrame } = require("electron");

// Building a string of JS is not the best, but is secure
function buildIPCResponseJS(requestId, result, errorReason) {
	let code = `
		(() => {
			const detail = {
				requestId: ${requestId},
	`;

	if (typeof errorReason === "undefined") {
		code += `result: ${JSON.stringify(result)},`;
	} else {
		code += `error: ${JSON.stringify(errorReason)},`;
	}

	code += `
			};
			const e = new CustomEvent('ipcResponse', {detail,});
			window.dispatchEvent(e);
		})();
	`;
	return code;
}

process.once("loaded", () => {
	window.addEventListener("message", (event) => {
		if (event.source !== window) {
			return;
		}

		const msg = event.data || {};

		if (msg.type === "ipcNotify") {
			ipcRenderer.send(msg.channel, ...msg.args);
		} else if (
			msg.type === "ipcRequest" &&
			typeof msg.requestId === "number" // Safety check
		) {
			ipcRenderer
				.invoke(msg.url, ...msg.args)
				.then((result) => {
					const code = buildIPCResponseJS(msg.requestId, result);
					webFrame.executeJavaScript(code);
				})
				.catch((reason) => {
					const code = buildIPCResponseJS(
						msg.requestId,
						null,
						reason,
					);
					webFrame.executeJavaScript(code);
				});
		}
	});
});
