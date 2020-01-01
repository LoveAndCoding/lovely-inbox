import Email from "../../../../common/email";
import {
	GUESS_CONFIG_BEGIN,
	GUESS_CONFIG_FAILURE,
	GUESS_CONFIG_SUCCESS,
	GuessConfigActionTypes,
	IGuessConfigState,
} from "./types";

const initialState: IGuessConfigState = {
	config: null,
	error: null,
	loading: false,
};

export default function guessConfig(
	state = initialState,
	action: GuessConfigActionTypes,
): IGuessConfigState {
	switch (action.type) {
		case GUESS_CONFIG_BEGIN:
			return {
				...state,
				error: null,
				loading: true,
			};
		case GUESS_CONFIG_SUCCESS:
			return {
				...state,
				config: action.config,
				loading: false,
			};
		case GUESS_CONFIG_FAILURE:
			return {
				...state,
				error: action.error,
				loading: false,
			};
		default:
			return state;
	}
}
