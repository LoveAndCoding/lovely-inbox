export default class ServerCommand {
	private command: () => Promise<boolean>;
	private running: Promise<boolean> | void;
	private lastRun: Promise<boolean> | void;

	public get results(): Promise<boolean> | void {
		return this.lastRun;
	}

	constructor(command: () => Promise<boolean>) {
		this.command = command;
	}

	public execute(): Promise<boolean> {
		const prom = (this.lastRun = this.running = this.command());
		prom.then(() => {
			if (this.running === prom) {
				this.running = undefined;
			}
		});
		return prom;
	}
}
