import { IServerConfig } from "../../../../common/server.config";

export * from "../../../../common/server.config";

export const GUESS_CONFIG_BEGIN = "GUESS_CONFIG_BEGIN";
export const GUESS_CONFIG_SUCCESS = "GUESS_CONFIG_SUCCESS";
export const GUESS_CONFIG_FAILURE = "GUESS_CONFIG_FAILURE";

export interface IConfigState {
	config: IServerConfig;
	loading: boolean;
	error: null | Error;
}

export interface IGuessConfigBeginAction {
	type: typeof GUESS_CONFIG_BEGIN;
}
export interface IGuessConfigSuccessAction {
	type: typeof GUESS_CONFIG_SUCCESS;
	config: IServerConfig;
}
export interface IGuessConfigFailureAction {
	type: typeof GUESS_CONFIG_FAILURE;
	error: Error;
}

export type GuessConfigActionTypes =
	| IGuessConfigBeginAction
	| IGuessConfigFailureAction
	| IGuessConfigSuccessAction;

export const CONFIG_UPDATE_USERNAME = "COFNIG_UPDATE_USERNAME";
export const CONFIG_UPDATE_INCOMING_HOST = "COFNIG_UPDATE_INCOMING_HOST";
export const CONFIG_UPDATE_INCOMING_PORT = "COFNIG_UPDATE_INCOMING_PORT";
export const CONFIG_UPDATE_INCOMING_SSL = "COFNIG_UPDATE_INCOMING_SSL";
export const CONFIG_UPDATE_INCOMING_TLS = "COFNIG_UPDATE_INCOMING_TLS";
export const CONFIG_UPDATE_OUTGOING_HOST = "COFNIG_UPDATE_OUTGOING_HOST";
export const CONFIG_UPDATE_OUTGOING_PORT = "COFNIG_UPDATE_OUTGOING_PORT";
export const CONFIG_UPDATE_OUTGOING_SSL = "COFNIG_UPDATE_OUTGOING_SSL";
export const CONFIG_UPDATE_OUTGOING_TLS = "COFNIG_UPDATE_OUTGOING_TLS";

export interface IConfigUpdateUsernameAction {
	type: typeof CONFIG_UPDATE_USERNAME;
	username: string;
}
export interface IConfigUpdateIncomingHostAction {
	type: typeof CONFIG_UPDATE_INCOMING_HOST;
	host: string;
}
export interface IConfigUpdateIncomingPortAction {
	type: typeof CONFIG_UPDATE_INCOMING_PORT;
	port: number;
}
export interface IConfigUpdateIncomingSSLAction {
	type: typeof CONFIG_UPDATE_INCOMING_SSL;
	ssl: boolean;
}
export interface IConfigUpdateIncomingTLSAction {
	type: typeof CONFIG_UPDATE_INCOMING_TLS;
	tls: boolean;
}
export interface IConfigUpdateOutgoingHostAction {
	type: typeof CONFIG_UPDATE_OUTGOING_HOST;
	host: string;
}
export interface IConfigUpdateOutgoingPortAction {
	type: typeof CONFIG_UPDATE_OUTGOING_PORT;
	port: number;
}
export interface IConfigUpdateOutgoingSSLAction {
	type: typeof CONFIG_UPDATE_OUTGOING_SSL;
	ssl: boolean;
}
export interface IConfigUpdateOutgoingTLSAction {
	type: typeof CONFIG_UPDATE_OUTGOING_TLS;
	tls: boolean;
}

export type ConfigUpdateActionTypes =
	| IConfigUpdateUsernameAction
	| IConfigUpdateIncomingHostAction
	| IConfigUpdateIncomingPortAction
	| IConfigUpdateIncomingSSLAction
	| IConfigUpdateIncomingTLSAction
	| IConfigUpdateOutgoingHostAction
	| IConfigUpdateOutgoingPortAction
	| IConfigUpdateOutgoingSSLAction
	| IConfigUpdateOutgoingTLSAction;
