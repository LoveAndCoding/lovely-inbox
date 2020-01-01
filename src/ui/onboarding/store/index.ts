import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";
import emailReducer from "./email/reducers";
import guessServerConfigReducer from "./server-config/reducers";

const rootReducer = combineReducers({
	emailAddress: emailReducer,
	guessConfig: guessServerConfigReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
	return createStore(rootReducer, applyMiddleware(thunk));
}
