import { IEmailProperties } from "./email";

export type AccountId = string;

export interface IAccountProperties {
	id: AccountId;
	email?: IEmailProperties;
}
