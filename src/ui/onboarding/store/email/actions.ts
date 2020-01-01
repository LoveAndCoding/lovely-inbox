import Email from "../../../../common/email";
import { ISetEmailAddressAction, SET_EMAIL_ADDRESS } from "./types";

export function setEmailAddress(email: string): ISetEmailAddressAction {
	try {
		// Try and create a email from the string
		email = new Email(email);
	} catch (e) {
		// ... but if it fails, we wipe any value we have saved
		email = null;
	}

	return {
		email,
		type: SET_EMAIL_ADDRESS,
	};
}
