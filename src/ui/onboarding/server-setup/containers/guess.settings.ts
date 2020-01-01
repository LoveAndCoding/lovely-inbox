import { connect } from "react-redux";

import { AppState } from "../../store";
import GuessServerSettings, {
	IGuessServerSettingsProps,
} from "../components/guess.settings";
import { thunkGuessConfig } from "../thunks";

const mapStateToProps = (
	state: AppState,
	ownProps: IGuessServerSettingsProps,
) => {
	return {
		...ownProps,
		config: state.guessConfig.config,
		email: state.emailAddress.email,
		error: state.guessConfig.error,
		loading: state.guessConfig.loading,
	};
};

export default connect(mapStateToProps, {
	guessConfig: thunkGuessConfig,
})(GuessServerSettings);
