import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

import Email from "../../../common/email";
import * as IPC from "../../communication/ipc";
import { AppState } from "../store";
import {
	guessConfigBegin,
	guessConfigFailure,
	guessConfigSuccess,
} from "../store/server-config/actions";
import { IServerConfig } from "../store/server-config/types";

export function thunkGuessConfig(
	email: Email,
): ThunkAction<Promise<null | IServerConfig>, AppState, null, Action<string>> {
	return (dispatch) => {
		dispatch(guessConfigBegin());
		return IPC.request("/account/server/settings/guess", email.address)
			.then((config) => {
				dispatch(guessConfigSuccess(config));
				return config;
			})
			.catch((error) => dispatch(guessConfigFailure(error)));
	};
}
