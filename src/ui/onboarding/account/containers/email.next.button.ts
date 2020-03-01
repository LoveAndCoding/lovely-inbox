import { connect, MapStateToProps } from "react-redux";

import LovelyButton, {
	ILovelyButtonOwnProps,
	ILovelyButtonStateProps,
} from "../../../forms/components/button";
import { AppState } from "../../store";

const mapStateToProps: MapStateToProps<
	ILovelyButtonStateProps,
	ILovelyButtonOwnProps,
	AppState
> = (state: AppState, ownProps: ILovelyButtonOwnProps) => {
	return {
		...ownProps,
		disabled: !state.emailAddress.email,
	};
};

export default connect(mapStateToProps)(LovelyButton);
