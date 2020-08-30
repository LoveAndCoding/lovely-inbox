import Email from "src/common/email";

export const SET_EMAIL_ADDRESS = "SET_EMAIL_ADDRESS";
export const SET_EMAIL_SENDER_NAME = "SET_EMAIL_SENDER_NAME";

export interface IEmailState {
	email: Email | null;
	name: string;
}

export interface ISetEmailSenderNameAction {
	type: typeof SET_EMAIL_SENDER_NAME;
	name: string;
}

export interface ISetEmailAddressAction {
	type: typeof SET_EMAIL_ADDRESS;
	email: Email;
}

export type EmailActionTypes =
	| ISetEmailAddressAction
	| ISetEmailSenderNameAction;
