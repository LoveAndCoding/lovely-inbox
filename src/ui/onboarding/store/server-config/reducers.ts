import Email from "../../../../common/email";
import {
	IGuessConfigState,
	GUESS_CONFIG_BEGIN,
	GUESS_CONFIG_FAILURE,
	GUESS_CONFIG_SUCCESS,
	GuessConfigActionTypes,
} from "./types";

const initialState: IGuessConfigState = {
	config: null,
	loading: false,
	error: null,
};

export default function guessConfig(
	state = initialState,
	action: GuessConfigActionTypes,
): IGuessConfigState {
	switch (action.type) {
		case GUESS_CONFIG_BEGIN:
			return {
				...state,
				loading: true,
				error: null,
			};
		case GUESS_CONFIG_SUCCESS:
			return {
				...state,
				loading: false,
				config: action.config,
			};
		case GUESS_CONFIG_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			};
		default:
			return state;
	}
}
