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

const mapStateToProps: MapStateToProps<
	IServerSettingsFormProps,
	{},
	AppState
> = (state: AppState, ownProps: {}) => {
	return {
		...ownProps,
		config: state.guessConfig.config,
		email: state.emailAddress.email,
	};
};

const mapDispatchToProps: MapDispatchToPropsFunction<
	IServerSettingsFormDispatchProps,
	{}
> = (dispatch, ownProps: {}) => {
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
