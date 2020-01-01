export interface IMailServer {
	host: string;
	port: number;
	ssl: boolean;
}

export interface IIncomingServerConfig {
	protocol: "imap";
	server: IMailServer;
}

export interface IOutgoingServerConfig {
	protocol: "smtp";
	server: IMailServer;
}

export interface IServerConfig {
	incoming: IIncomingServerConfig;
	outgoing: IOutgoingServerConfig;
}
