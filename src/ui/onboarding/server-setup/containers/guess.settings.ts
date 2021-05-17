import { connect, MapStateToProps } from "react-redux";

import { AppState } from "../../store";
import GuessServerSettings, {
	IGuessSettingsStateProps,
} from "../components/guess.settings";
import { thunkGuessConfig } from "../thunks";

type GuessSettingsOwnProps = Record<string, unknown>;

const mapStateToProps: MapStateToProps<
	IGuessSettingsStateProps,
	GuessSettingsOwnProps,
	AppState
> = (state: AppState, ownProps: GuessSettingsOwnProps) => {
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
