export interface IMailServer {
	host: string;
	port: number;
	ssl?: boolean;
	tls?: boolean;
}

export interface IIncomingServerConfig {
	protocol: "imap";
	server: IMailServer;
}

export interface IOutgoingServerConfig {
	protocol: "smtp";
	server: IMailServer;
}

export enum CONFIG_SOURCE {
	Confirmed_Guess = "guessed right",
	Guess = "just guessed",
	Known_DNS = "known dns",
	Known_Domain = "known domain",
	User = "user entered",
}

export interface IServerConfig {
	incoming?: IIncomingServerConfig;
	outgoing?: IOutgoingServerConfig;
	source: CONFIG_SOURCE;
	username: string;
}
