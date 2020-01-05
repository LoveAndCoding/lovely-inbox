export default class ServerCommand {
	private command: () => Promise<boolean>;
	private running: Promise<boolean> | void;
	private lastRun: Promise<boolean> | void;

	public get results() {
		return this.lastRun;
	}

	constructor(command: () => Promise<boolean>) {
		this.command = command;
		this.running = false;
	}

	public execute() {
		const prom = (this.lastRun = this.running = this.command());
		prom.then(() => {
			if (this.running === prom) {
				this.running = undefined;
			}
		});
		return prom;
	}
}
