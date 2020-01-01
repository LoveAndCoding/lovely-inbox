import { IServerConfig } from "../../../../common/server.config";

export * from "../../../../common/server.config";

export const GUESS_CONFIG_BEGIN = "GUESS_CONFIG_BEGIN";
export const GUESS_CONFIG_SUCCESS = "GUESS_CONFIG_SUCCESS";
export const GUESS_CONFIG_FAILURE = "GUESS_CONFIG_FAILURE";

export interface IGuessConfigState {
	config: null | IServerConfig;
	loading: boolean;
	error: null | Error;
}

export interface IGuessConfigBeginAction {
	type: typeof GUESS_CONFIG_BEGIN;
}
export interface IGuessConfigSuccessAction {
	type: typeof GUESS_CONFIG_SUCCESS;
	config: null | IServerConfig;
}
export interface IGuessConfigFailureAction {
	type: typeof GUESS_CONFIG_FAILURE;
	error: Error;
}

export type GuessConfigActionTypes =
	| IGuessConfigBeginAction
	| IGuessConfigFailureAction
	| IGuessConfigSuccessAction;
