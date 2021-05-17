import {
	connect,
	MapDispatchToPropsFunction,
	MapStateToProps,
} from "react-redux";

import { AppState } from "../../store";
import {
	configUpdateIncomingHost,
	configUpdateOutgoingHost,
	configUpdateUsername,
} from "../../store/server-config/actions";
import ServerSettingsForm, {
	IServerSettingsFormDispatchProps,
	IServerSettingsFormProps,
} from "../components/server.settings.form";

type ServerSettingsFormOwnProps = Record<string, unknown>;

const mapStateToProps: MapStateToProps<
	IServerSettingsFormProps,
	ServerSettingsFormOwnProps,
	AppState
> = (state: AppState, ownProps: ServerSettingsFormOwnProps) => {
	return {
		...ownProps,
		config: state.guessConfig.config,
		email: state.emailAddress.email,
	};
};

const mapDispatchToProps: MapDispatchToPropsFunction<
	IServerSettingsFormDispatchProps,
	ServerSettingsFormOwnProps
> = (dispatch) => {
	return {
		onIncomingHostChange: (host: string) =>
			dispatch(configUpdateIncomingHost(host)),
		onOutgoingHostChange: (host: string) =>
			dispatch(configUpdateOutgoingHost(host)),
		onUsernameChange: (username: string) =>
			dispatch(configUpdateUsername(username)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerSettingsForm);
