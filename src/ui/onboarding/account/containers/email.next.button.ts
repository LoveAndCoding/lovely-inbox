import { connect } from "react-redux";

import LovelyButton, {
	LovelyButtonProps,
} from "../../../forms/components/button";
import { AppState } from "../../store";

const mapStateToProps = (state: AppState, ownProps: LovelyButtonProps) => {
	return {
		...ownProps,
		disabled: !state.emailAddress.email,
	};
};

export default connect(mapStateToProps)(LovelyButton);
