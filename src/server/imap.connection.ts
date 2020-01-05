import * as IMAP from "imap";
import { TlsOptions } from "tls";

import logger from "../logger";
import ServerConnection, { ConnectionOptions } from "./base.connection";

interface IMAPLibaryOptions {
	authTimeout?: number;
	autotls?: boolean;
	connTimeout?: number;
	socketTimeout?: number;
	tls?: boolean;
	tlsOptions?: TlsOptions;
	user: string;
}

type IMAPConnectionOptions = Readonly<IMAPLibaryOptions & ConnectionOptions>;

export default class IMAPConnection extends ServerConnection {
	public options: IMAPConnectionOptions;
	private imap: void | IMAP;

	constructor(options: IMAPConnectionOptions) {
		super(options);
	}

	public connect(password: string): Promise<boolean> {
		const imapOpts = Object.assign(this.getBaseIMAPOptions(), {
			// TODO(alexis): We should avoid keeping the password around as much
			// as we can, but that requires fixing the library, which is a big
			// task. So I'm putting this as a TODO to do a full rewrite of auth
			// in the IMAP library... you know, as you do sometimes...
			password,
		});
		this.imap = new IMAP(imapOpts);

		return new Promise((resolve, reject) => {
			const errHandler = (err: Error) => {
				reject(err);
			};
			this.imap.on("error", errHandler);
			this.imap.once("ready", () => {
				this.imap.removeListener("error", errHandler);
				resolve();
			});
			this.imap.connect();
		}).then(this.onConnect);
	}

	public testConnection(): Promise<boolean> {
		const imapOpts = this.getBaseIMAPOptions();
		const testImap = new IMAP(imapOpts);

		return new Promise((resolve, reject) => {
			const cleanup = () => {
				try {
					testImap.destroy();
					testImap.removeListener("error", errHandler);
					testImap.removeListener("ready", readyHandler);
				} catch (e) {
					logger.error(
						`Error cleaning up socket connection from connection test: ${e.message}`,
					);
				}
			};
			const errHandler = (err: Error) => {
				cleanup();
				resolve(
					err.source === "authentication" &&
						// We've successfully done everything except
						// authenticate, this is probably the droid we're
						// looking for if the error message is about not having
						// an authentication method (which for us just means we
						// didn't provide any)
						// TODO(alexis): Comparing the error message here seems
						// very fragile. Tweak the library to do better
						err.message ===
							"No supported authentication method(s) available." +
								" Unable to login.",
				);
			};
			const readyHandler = () => {
				cleanup();
				reject(
					new Error(
						"Test connection thinks it was ready without auth?!",
					),
				);
			};
			testImap.once("error", errHandler);
			testImap.once("ready", readyHandler);
			testImap.connect();
		});
	}

	public disconnect(force: boolean) {
		this.connected = false;

		if (this.imap) {
			this.imap.destroy();
			this.emit("disconnected");
		}
	}

	private getBaseIMAPOptions() {
		// Pull a subset of options so we don't include extra options and also
		// so we can modify this object without doing so globally
		return {
			// Basics
			host: this.options.host,
			port: this.options.port,
			user: this.options.user,

			// TLS defaults (default to secure)
			autotls:
				typeof this.options.autotls === "boolean"
					? this.options.autotls
					: true,
			tls:
				typeof this.options.tls === "boolean" ? this.options.tls : true,
			tlsOptions: this.options.tlsOptions,

			// Timeouts + Reconnects
			authTimeout: this.options.authTimeout,
			connTimeout: this.options.connTimeout,
			keepalive: this.options.autoReconnect,
			socketTimeout: this.options.socketTimeout,
		};
	}

	// private onAlert = (msg: string) => {};
	// private onClose = (hadError: boolean) => {};

	private onConnect = () => {
		if (!this.imap || this.imap.state === "disconnected") {
			logger.error(
				"IMAP.onConnect called when the IMAP client was not available",
			);
			return;
		}

		this.connected = true;

		// this.imap.on("alert", this.onAlert);
		// this.imap.on("close", this.onClose);
		// this.imap.on("end", this.onEnd);
		// this.imap.on("error", this.onError);
		// this.imap.on("expunge", this.onExpunge);
		// this.imap.on("mail", this.onMail);
		// this.imap.on("uidvalidity", this.onUIDValidity);
		// this.imap.on("update", this.onUpdate);

		this.emit("connected");
	};

	// private onEnd = () => {};
	// private onError = (err: Error) => {};
	// private onExpunge = (seqNo: number) => {};
	// private onMail = (numNewMsgs: number) => {};
	// private onUIDValidity = (uidvalidity: number) => {};
	// private onUpdate = (seqNo: number, info: IMAP.ImapMessageAttributes) => {};
}
