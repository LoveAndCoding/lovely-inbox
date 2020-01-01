import Email from "../../../../common/email";
import { EmailActionTypes, IEmailState, SET_EMAIL_ADDRESS } from "./types";

const initialState: IEmailState = {
	email: null,
};

export default function emailAddress(
	state = initialState,
	action: EmailActionTypes,
): IEmailState {
	if (action.type === SET_EMAIL_ADDRESS) {
		return {
			...state,
			email: action.email,
		};
	}
	return state;
}
