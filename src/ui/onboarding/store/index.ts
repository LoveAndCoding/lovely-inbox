import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import emailReducer from "./email/reducers";
import updateServerConfigReducer from "./server-config/reducers";

const rootReducer = combineReducers({
	emailAddress: emailReducer,
	guessConfig: updateServerConfigReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
	return createStore(rootReducer, applyMiddleware(thunk));
}
