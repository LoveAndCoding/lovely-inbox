import { combineReducers } from "redux";

import emailAddress from "./email";

const onboardingReducer = combineReducers({
	emailAddress,
});

export type OnboardingState = ReturnType<typeof onboardingReducer>;

export default onboardingReducer;
