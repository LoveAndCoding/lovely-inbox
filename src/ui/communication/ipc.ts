export function send(channel: string, ...args: any) {
	window.postMessage(
		{
			args,
			channel,
			type: "ipcRenderer",
		},
		"*",
	);
}
