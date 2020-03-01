import {
	connect,
	MapDispatchToPropsFunction,
	MapStateToProps,
} from "react-redux";

import InputField, {
	InputFieldDispatchProps,
	InputFieldOwnProps,
	InputFieldStateProps,
} from "../../../forms/components/input.field";
import { AppState } from "../../store";
import { setEmailAddress } from "../../store/email/actions";

const mapStateToProps: MapStateToProps<
	InputFieldStateProps,
	InputFieldOwnProps,
	AppState
> = (state: AppState, ownProps: InputFieldOwnProps) => {
	return {
		...ownProps,
		defaultValue: state.emailAddress.email
			? state.emailAddress.email.address
			: "",
	};
};

const mapDispatchToProps: MapDispatchToPropsFunction<
	InputFieldDispatchProps,
	InputFieldOwnProps
> = (dispatch, ownProps: InputFieldOwnProps) => {
	return {
		onChange: (email) => {
			dispatch(setEmailAddress(email));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(InputField);
