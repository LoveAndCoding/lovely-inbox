import { connect } from "react-redux";

import EmailTextField, {
	EmailFieldProps,
} from "../../../forms/components/email.text.field";
import { setEmailAddress } from "../../store/email/actions";
import { AppState } from "../../store";

const mapStateToProps = (state: OnboardingState, ownProps: EmailFieldProps) => {
	return {
		...ownProps,
		defaultValue: state.emailAddress ? state.emailAddress.address : "",
	};
};

const mapDispatchToProps = (dispatch, ownProps: EmailFieldProps) => {
	return {
		onChange: (email) => {
			dispatch(setEmailAddress(email));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailTextField);
