import {
	CONFIG_UPDATE_INCOMING_HOST,
	CONFIG_UPDATE_INCOMING_PORT,
	CONFIG_UPDATE_INCOMING_SSL,
	CONFIG_UPDATE_INCOMING_TLS,
	CONFIG_UPDATE_OUTGOING_HOST,
	CONFIG_UPDATE_OUTGOING_PORT,
	CONFIG_UPDATE_OUTGOING_SSL,
	CONFIG_UPDATE_OUTGOING_TLS,
	CONFIG_UPDATE_USERNAME,
	GUESS_CONFIG_BEGIN,
	GUESS_CONFIG_FAILURE,
	GUESS_CONFIG_SUCCESS,
	IConfigUpdateIncomingHostAction,
	IConfigUpdateIncomingPortAction,
	IConfigUpdateIncomingSSLAction,
	IConfigUpdateIncomingTLSAction,
	IConfigUpdateOutgoingHostAction,
	IConfigUpdateOutgoingPortAction,
	IConfigUpdateOutgoingSSLAction,
	IConfigUpdateOutgoingTLSAction,
	IConfigUpdateUsernameAction,
	IGuessConfigBeginAction,
	IGuessConfigFailureAction,
	IGuessConfigSuccessAction,
	IServerConfig,
} from "./types";

// User Config Update Actions
export const configUpdateUsername = (
	username: string,
): IConfigUpdateUsernameAction => ({
	type: CONFIG_UPDATE_USERNAME,
	username,
});
export const configUpdateIncomingHost = (
	host: string,
): IConfigUpdateIncomingHostAction => ({
	host,
	type: CONFIG_UPDATE_INCOMING_HOST,
});
export const configUpdateIncomingPort = (
	port: number,
): IConfigUpdateIncomingPortAction => ({
	port,
	type: CONFIG_UPDATE_INCOMING_PORT,
});
export const configUpdateIncomingSSL = (
	ssl: boolean,
): IConfigUpdateIncomingSSLAction => ({
	ssl,
	type: CONFIG_UPDATE_INCOMING_SSL,
});
export const configUpdateIncomingTLS = (
	tls: boolean,
): IConfigUpdateIncomingTLSAction => ({
	tls,
	type: CONFIG_UPDATE_INCOMING_TLS,
});
export const configUpdateOutgoingHost = (
	host: string,
): IConfigUpdateOutgoingHostAction => ({
	host,
	type: CONFIG_UPDATE_OUTGOING_HOST,
});
export const configUpdateOutgoingPort = (
	port: number,
): IConfigUpdateOutgoingPortAction => ({
	port,
	type: CONFIG_UPDATE_OUTGOING_PORT,
});
export const configUpdateOutgoingSSL = (
	ssl: boolean,
): IConfigUpdateOutgoingSSLAction => ({
	ssl,
	type: CONFIG_UPDATE_OUTGOING_SSL,
});
export const configUpdateOutgoingTLS = (
	tls: boolean,
): IConfigUpdateOutgoingTLSAction => ({
	tls,
	type: CONFIG_UPDATE_OUTGOING_TLS,
});

// Guessing Configuration Actions
export const guessConfigBegin = (): IGuessConfigBeginAction => ({
	type: GUESS_CONFIG_BEGIN,
});

export const guessConfigSuccess = (
	config: void | IServerConfig,
): IGuessConfigSuccessAction => ({
	config,
	type: GUESS_CONFIG_SUCCESS,
});

export const guessConfigFailure = (
	error: Error,
): IGuessConfigFailureAction => ({
	error,
	type: GUESS_CONFIG_FAILURE,
});
