import { EventEmitter } from "events";
import * as IMAP from "imap";

import ServerCommand from "./server.command";

export type ConnectionOptions = Readonly<{
	host: string;
	port: number;
	autoReconnect: boolean;
}>;

export default abstract class ServerConnection extends EventEmitter {
	protected connection: Promise<boolean> | void;
	protected changingBoxes: boolean;
	protected currentBox: string | void;
	protected readonly options: ConnectionOptions;
	protected queue: ServerCommand[];
	protected queueDraining: boolean;
	protected executingCommand: ServerCommand;

	public abstract get connected(): boolean;

	public get box() {
		return this.connection ? this.currentBox : undefined;
	}

	constructor(options: ConnectionOptions) {
		super();
		this.changingBoxes = false;
		this.options = options;
		this.queue = [];
		// Begin with the queue'd commands draining
		this.queueDraining = true;
	}

	public abstract connect(password: string): Promise<boolean>;
	public abstract disconnect(force: boolean): void;

	// public abstract listBoxes(): Promise<Box[]>;

	protected queueCommand(command: () => Promise<boolean>) {
		this.queue.push(new ServerCommand(command));
		this.nextCommand();
	}

	protected unpauseCommands() {
		this.queueDraining = true;
		this.nextCommand();
	}

	protected pauseCommands() {
		this.queueDraining = false;
	}

	protected nextCommand(): ServerCommand | void {
		if (!this.queueDraining) {
			return;
		}

		const nextCmd = this.queue.shift();
		if (!this.executingCommand && nextCmd) {
			this.executingCommand = nextCmd;
			const run = nextCmd.execute();
			run.finally(() => {
				if (this.executingCommand === nextCmd) {
					this.executingCommand = undefined;
					this.nextCommand();
				}
			});
		}

		return this.executingCommand;
	}
}
