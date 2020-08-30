import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import { AppState } from "../../store";
import GuessServerSettings, {
	IGuessSettingsDispatchProps,
	IGuessSettingsStateProps,
} from "../components/guess.settings";
import { thunkGuessConfig } from "../thunks";

const mapStateToProps: MapStateToProps<
	IGuessSettingsStateProps,
	{},
	AppState
> = (state: AppState, ownProps: {}) => {
	return {
		...ownProps,
		config: state.guessConfig.config,
		email: state.emailAddress.email,
		error: state.guessConfig.error,
		loading: state.guessConfig.loading,
	};
};

export default connect(mapStateToProps, { guessConfig: thunkGuessConfig })(
	GuessServerSettings,
);
