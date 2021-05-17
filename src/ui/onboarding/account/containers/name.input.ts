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
import { setEmailSenderName } from "../../store/email/actions";

const mapStateToProps: MapStateToProps<
	IInputFieldStateProps,
	InputFieldOwnProps,
	AppState
> = (state: AppState, ownProps: InputFieldOwnProps) => {
	return {
		...ownProps,
		defaultValue: state.emailAddress.name,
	};
};

const mapDispatchToProps: MapDispatchToPropsFunction<
	InputFieldDispatchProps,
	InputFieldOwnProps
> = (dispatch) => {
	return {
		onChange: (name) => {
			dispatch(setEmailSenderName(name));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(InputField);
