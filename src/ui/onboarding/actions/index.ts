import { ISetEmailAddressAction } from "./types";

export * from "./email";

// We want to wrap this in a variable instead of just a re-export
export type Action = ISetEmailAddressAction;
