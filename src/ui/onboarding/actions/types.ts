import Email from "src/common/email";
import * as Names from "./names";

export interface ISetEmailAddressAction {
	type: typeof Names.SET_EMAIL_ADDRESS;
	email: Email;
}
