import { connect, MapStateToProps } from "react-redux";

import LovelyButton, {
	LovelyButtonOwnProps,
	LovelyButtonStateProps,
} from "../../../forms/components/button";
import { AppState } from "../../store";

const mapStateToProps: MapStateToProps<
	LovelyButtonStateProps,
	LovelyButtonOwnProps,
	AppState
> = (state: AppState, ownProps: LovelyButtonOwnProps) => {
	return {
		...ownProps,
		disabled: !state.emailAddress.email,
	};
};

export default connect(mapStateToProps)(LovelyButton);
