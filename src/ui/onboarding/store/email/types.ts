import Email from "src/common/email";

export const SET_EMAIL_ADDRESS = "SET_EMAIL_ADDRESS";

export interface IEmailState {
	email: Email | null;
}

export interface ISetEmailAddressAction {
	type: typeof SET_EMAIL_ADDRESS;
	email: Email;
}

export type EmailActionTypes = ISetEmailAddressAction;
