import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import emailReducer from "./email/reducers";
import rootReducer from "./reducers";
import guessServerConfigReducer from "./server-config/reducers";

const rootReducer = combineReducers({
	emailAddress: emailReducer,
	guessConfig: guessServerConfigReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
	return createStore(rootReducer, applyMiddleware(thunk));
}
