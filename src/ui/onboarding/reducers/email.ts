import Email from "../../../common/email";
import { Action } from "../actions";
import { SET_EMAIL_ADDRESS } from "../actions/names";

export default function emailAddress(state: Email? = null, action: Action) {
	if (action.type === SET_EMAIL_ADDRESS) {
		return action.email;
	}
	return state;
}
