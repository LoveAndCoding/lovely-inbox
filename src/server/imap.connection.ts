import * as IMAP from "imap";
import { Socket } from "net";
import { ConnectionOptions as TLSConnectionOptions, TLSSocket } from "tls";

import logger from "../logger";
import ServerConnection, { ConnectionOptions } from "./base.connection";

interface IMAPLibaryOptions {
	authTimeout?: number;
	autotls?: "always" | "required" | "never";
	connTimeout?: number;
	socketTimeout?: number;
	tls?: boolean;
	tlsOptions?: TLSConnectionOptions;
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
		const imapOpts: IMAP.Config = Object.assign(this.getBaseIMAPOptions(), {
			// TODO(alexis): We should avoid keeping the password around as much
			// as we can, but that requires fixing the library, which is a big
			// task. So I'm putting this as a TODO to do a full rewrite of auth
			// in the IMAP library... you know, as you do sometimes...
			password,
		});
		const imap = (this.imap = new IMAP(imapOpts));

		return new Promise<boolean>((resolve, reject) => {
			const errHandler = (err: Error) => {
				reject(err);
			};
			imap.on("error", errHandler);
			imap.once("ready", () => {
				imap.removeListener("error", errHandler);
				resolve(true);
			});
			imap.connect();
		}).then((result: boolean) => {
			this.onConnect();
			return result;
		});
	}

	public get connected() {
		return this.imap && this.imap.state !== "disconnected";
	}

	public testConnection(): Promise<false | string[]> {
		// For testing a connection, we don't need to use the full IMAP library,
		// we can simply open up a socket and check if things are what we expect
		const imapOpts = this.getBaseIMAPOptions();
		const rawSock = new Socket();

		let sock = rawSock;
		if (imapOpts.tls) {
			sock = new TLSSocket(rawSock);
		}

		const cleanup = () => {
			try {
				if (!sock.destroyed) {
					sock.destroy();
				}
			} catch (e) {
				logger.error(
					`Error cleaning up socket connection from connection test: ${e.message}`,
				);
			}
		};

		return new Promise((resolve, reject) => {
			let dataRead = "";
			let returned = false;

			// We need to wrap things up and return the promise at the end of
			// all the things
			const finalize = () => {
				if (returned) {
					// If we've already returned ignore this call
					return;
				}

				// Otherwise resolve the promise
				const lines = dataRead.split("\r\n");
				const caps: string[] = [];
				const capMatchString = " CAPABILITY ";
				lines.forEach((line) => {
					const capIndex = line.indexOf(capMatchString);
					if (capIndex >= 0 && capIndex <= 7) {
						// If we see the word capability early in the line, it's
						// probably a line we're looking for
						caps.push(
							...line
								.substr(capIndex + capMatchString.length)
								.split(" "),
						);
					}
				});

				resolve(caps.length ? caps : false);
				// And mark that we've returned something
				returned = true;
			};

			// Wrap any functions so we can catch errors and reject
			function catchErrors<T>(cb: (data: T) => void): (data: T) => void {
				return (data: T) => {
					try {
						cb(data);
					} catch (e) {
						returned = true;
						reject(e);
						cleanup();
					}
				};
			}

			sock.once(
				"close",
				// When closing, clean everything up and make sure we resolved
				catchErrors<boolean>(() => {
					cleanup();
					finalize();
				}),
			);
			sock.once(
				"connect",
				// If we get a connection, find out what the server can do then
				// logout so we don't leave the connection open
				catchErrors<void>(() => {
					sock.write("a001 CAPABILITY\r\na002 LOGOUT\r\n");
				}),
			);
			sock.on(
				"data",
				// Record data
				catchErrors((data) => (dataRead += data.toString("utf8"))),
			);
			sock.once(
				"end",
				// When ending, clean everything up and make sure we resolved
				catchErrors<void>(() => {
					cleanup();
					finalize();
				}),
			);
			// If we get an error, probably means we're not a server
			sock.on("error", (e) => {
				cleanup();
				finalize();
			});

			sock.setTimeout(5000, () => {
				cleanup();
				finalize();
			});

			// Make a connection
			rawSock.connect({
				host: imapOpts.host,
				port: imapOpts.port,
			});
		});
	}

	public disconnect(force: boolean) {
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
				typeof this.options.autotls === "string"
					? this.options.autotls
					: "always",
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
