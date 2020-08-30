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
import OnboardServerSettings, {
	IServerSettingsDispatchProps,
	IServerSettingsProps,
} from "../components/server.settings";

const mapStateToProps: MapStateToProps<IServerSettingsProps, {}, AppState> = (
	state: AppState,
	ownProps: {},
) => {
	return {
		...ownProps,
		config: state.guessConfig.config,
		email: state.emailAddress.email,
	};
};

const mapDispatchToProps: MapDispatchToPropsFunction<
	IServerSettingsDispatchProps,
	{}
> = (dispatch, ownProps: {}) => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(OnboardServerSettings);
