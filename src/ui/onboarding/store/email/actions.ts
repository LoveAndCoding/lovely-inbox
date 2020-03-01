import Email from "../../../../common/email";
import { ISetEmailAddressAction, SET_EMAIL_ADDRESS } from "./types";

export function setEmailAddress(email: string): ISetEmailAddressAction {
	let parsedEmail = null;
	try {
		// Try and create a email from the string
		parsedEmail = new Email(email);
	} catch (e) {
		// ... but if it fails, we consider it invalid
	}

	return {
		email: parsedEmail,
		type: SET_EMAIL_ADDRESS,
	};
}
