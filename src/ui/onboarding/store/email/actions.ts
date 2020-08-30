import Email from "../../../../common/email";
import {
	ISetEmailSenderNameAction,
	ISetEmailAddressAction,
	SET_EMAIL_ADDRESS,
	SET_EMAIL_SENDER_NAME,
} from "./types";

export function setEmailSenderName(name: string): ISetEmailSenderNameAction {
	return {
		name,
		type: SET_EMAIL_SENDER_NAME,
	};
}

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
