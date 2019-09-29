import { connect } from "react-redux";
import LovelyButton, { LovelyButtonProps } from "../../forms/components/button";
import { OnboardingState } from "../reducers";

const mapStateToProps = (
	state: OnboardingState,
	ownProps: LovelyButtonProps,
) => {
	return {
		...ownProps,
		disabled: !state.emailAddress,
	};
};

export default connect(mapStateToProps)(LovelyButton);
