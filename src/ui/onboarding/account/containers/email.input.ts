import {
	connect,
	MapDispatchToPropsFunction,
	MapStateToProps,
} from "react-redux";

import InputField, {
	IInputFieldStateProps,
	InputFieldDispatchProps,
	InputFieldOwnProps,
} from "../../../forms/components/input.field";
import { AppState } from "../../store";
import { setEmailAddress } from "../../store/email/actions";

const mapStateToProps: MapStateToProps<
	IInputFieldStateProps,
	InputFieldOwnProps,
	AppState
> = (state: AppState, ownProps: InputFieldOwnProps) => {
	return {
		...ownProps,
		defaultValue: state.emailAddress.email
			? state.emailAddress.email.fullAddress
			: "",
	};
};

const mapDispatchToProps: MapDispatchToPropsFunction<
	InputFieldDispatchProps,
	InputFieldOwnProps
> = (dispatch) => {
	return {
		onChange: (email) => {
			dispatch(setEmailAddress(email));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(InputField);
