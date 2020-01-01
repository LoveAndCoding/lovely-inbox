import { connect } from "react-redux";

import LovelyButton, {
	LovelyButtonProps,
} from "../../../forms/components/button";
import { AppState } from "../../store";

const mapStateToProps = (state: AppState, ownProps: LovelyButtonProps) => {
	return {
		...ownProps,
		disabled:
			state.guessConfig.loading ||
			state.guessConfig.error ||
			!state.guessConfig.config,
	};
};

export default connect(mapStateToProps)(LovelyButton);
