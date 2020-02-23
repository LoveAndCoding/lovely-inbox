import Email from "../../../../common/email";
import {
	CONFIG_SOURCE,
	CONFIG_UPDATE_INCOMING_HOST,
	CONFIG_UPDATE_INCOMING_PORT,
	CONFIG_UPDATE_INCOMING_SSL,
	CONFIG_UPDATE_INCOMING_TLS,
	CONFIG_UPDATE_OUTGOING_HOST,
	CONFIG_UPDATE_OUTGOING_PORT,
	CONFIG_UPDATE_OUTGOING_SSL,
	CONFIG_UPDATE_OUTGOING_TLS,
	CONFIG_UPDATE_USERNAME,
	ConfigUpdateActionTypes,
	GUESS_CONFIG_BEGIN,
	GUESS_CONFIG_FAILURE,
	GUESS_CONFIG_SUCCESS,
	GuessConfigActionTypes,
	IConfigState,
} from "./types";

const initialState: IConfigState = {
	config: null,
	error: null,
	loading: false,
};

export default function updateConfig(
	state = initialState,
	action: GuessConfigActionTypes | ConfigUpdateActionTypes,
): IConfigState {
	// In case we're updating a field in the config, copy it
	const updatedConfig: IConfigState = {
		...state,

		// If the user is updating things, clear out the guess fields
		error: null,
		loading: false,

		config: {
			...state.config,
			// Any updates will be from the user, mark accordingly
			source: CONFIG_SOURCE.User,

			incoming: {
				...state.config?.incoming,
				server: {
					...state.config?.incoming?.server,
				},
			},
			outgoing: {
				...state.config?.outgoing,
				server: {
					...state.config?.outgoing?.server,
				},
			},
		},
	};

	switch (action.type) {
		// Handle guessing, which is done by thunk before the user can update
		case GUESS_CONFIG_BEGIN:
			return {
				...state,
				error: null,
				loading: true,
			};
		case GUESS_CONFIG_SUCCESS:
			return {
				...state,
				config: action.config,
				loading: false,
			};
		case GUESS_CONFIG_FAILURE:
			return {
				...state,
				error: action.error,
				loading: false,
			};

		// User is making an update
		case CONFIG_UPDATE_INCOMING_HOST:
			updatedConfig.config.incoming.server.host = action.host;
			return updatedConfig;
		case CONFIG_UPDATE_INCOMING_PORT:
			updatedConfig.config.incoming.server.port = action.port;
			return updatedConfig;
		case CONFIG_UPDATE_INCOMING_SSL:
			updatedConfig.config.incoming.server.ssl = action.ssl;
			return updatedConfig;
		case CONFIG_UPDATE_INCOMING_TLS:
			updatedConfig.config.incoming.server.tls = action.tls;
			return updatedConfig;
		case CONFIG_UPDATE_OUTGOING_HOST:
			updatedConfig.config.outgoing.server.host = action.host;
			return updatedConfig;
		case CONFIG_UPDATE_OUTGOING_PORT:
			updatedConfig.config.outgoing.server.port = action.port;
			return updatedConfig;
		case CONFIG_UPDATE_OUTGOING_SSL:
			updatedConfig.config.outgoing.server.ssl = action.ssl;
			return updatedConfig;
		case CONFIG_UPDATE_OUTGOING_TLS:
			updatedConfig.config.outgoing.server.tls = action.tls;
			return updatedConfig;
		case CONFIG_UPDATE_USERNAME:
			updatedConfig.config.username = action.username;
			return updatedConfig;

		default:
			return state;
	}
}
