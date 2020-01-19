import { connect } from "react-redux";

import InputField, {
	InputFieldProps,
} from "../../../forms/components/input.field";
import { AppState } from "../../store";
import { setEmailAddress } from "../../store/email/actions";

const mapStateToProps = (state: AppState, ownProps: InputFieldProps) => {
	return {
		...ownProps,
		defaultValue: state.emailAddress.email
			? state.emailAddress.email.address
			: "",
	};
};

const mapDispatchToProps = (dispatch, ownProps: InputFieldProps) => {
	return {
		onChange: (email) => {
			dispatch(setEmailAddress(email));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(InputField);
