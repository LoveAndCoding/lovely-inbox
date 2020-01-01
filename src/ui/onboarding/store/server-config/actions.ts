import {
	GUESS_CONFIG_BEGIN,
	GUESS_CONFIG_FAILURE,
	GUESS_CONFIG_SUCCESS,
	IGuessConfigBeginAction,
	IGuessConfigFailureAction,
	IGuessConfigSuccessAction,
	IServerConfig,
} from "./types";

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
