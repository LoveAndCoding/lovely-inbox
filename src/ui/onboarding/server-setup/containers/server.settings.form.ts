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

const mapStateToProps: MapStateToProps<AppState, IServerSettingsFormProps> = (
	state: AppState,
	ownProps: IServerSettingsFormProps,
) => {
	return {
		...ownProps,
		config: state.guessConfig.config,
		email: state.emailAddress.email,
	};
};

const mapDispatchToProps: MapDispatchToPropsFunction<
	IServerSettingsFormDispatchProps,
	IServerSettingsFormProps
> = (dispatch, ownProps: IServerSettingsFormProps) => {
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
