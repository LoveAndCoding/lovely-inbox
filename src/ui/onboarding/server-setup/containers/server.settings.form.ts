import { connect } from "react-redux";

import { AppState } from "../../store";
import ServerSettingsForm, {
	IServerSettingsFormProps,
} from "../components/server.settings.form";

const mapStateToProps = (
	state: AppState,
	ownProps: IServerSettingsFormProps,
) => {
	return {
		...ownProps,
		config: state.guessConfig.config,
		email: state.emailAddress.email,
	};
};

export default connect(mapStateToProps)(ServerSettingsForm);
