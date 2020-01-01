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
	type: GUESS_CONFIG_SUCCESS,
	config,
});

export const guessConfigFailure = (
	error: Error,
): IGuessConfigFailureAction => ({
	type: GUESS_CONFIG_FAILURE,
	error,
});
