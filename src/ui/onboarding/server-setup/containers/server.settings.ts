import { connect, MapStateToProps } from "react-redux";

import { AppState } from "../../store";
import OnboardServerSettings, {
	IServerSettingsProps,
} from "../components/server.settings";

type ServerSettingsOwnProps = Record<string, unknown>;

const mapStateToProps: MapStateToProps<
	IServerSettingsProps,
	ServerSettingsOwnProps,
	AppState
> = (state: AppState, ownProps: ServerSettingsOwnProps) => {
	return {
		...ownProps,
		config: state.guessConfig.config,
		email: state.emailAddress.email,
	};
};

export default connect(mapStateToProps)(OnboardServerSettings);
