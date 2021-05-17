import {
	EmailActionTypes,
	IEmailState,
	SET_EMAIL_ADDRESS,
	SET_EMAIL_SENDER_NAME,
} from "./types";

const initialState: IEmailState = {
	email: null,
	name: "",
};

export default function emailAddress(
	state = initialState,
	action: EmailActionTypes,
): IEmailState {
	if (action.type === SET_EMAIL_ADDRESS) {
		// Set the name on the email if we have one
		if (state.name && action.email) {
			action.email.name = state.name;
		}

		return {
			...state,
			email: action.email,
		};
	} else if (action.type === SET_EMAIL_SENDER_NAME) {
		// Update the email object's name value too
		if (state.email) {
			state.email.name = action.name;
		}

		return {
			...state,
			name: action.name,
		};
	}
	return state;
}
