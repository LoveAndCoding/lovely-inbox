import {
	connect,
	MapDispatchToPropsFunction,
	MapStateToProps,
} from "react-redux";

import InputField, {
	InputFieldProps,
} from "../../../forms/components/input.field";
import { ITypeable, IValidatable } from "../../../forms/types";
import { AppState } from "../../store";
import { setEmailAddress } from "../../store/email/actions";

const mapStateToProps: MapStateToProps<AppState, InputFieldProps> = (
	state: AppState,
	ownProps: InputFieldProps,
) => {
	return {
		...ownProps,
		defaultValue: state.emailAddress.email
			? state.emailAddress.email.address
			: "",
	};
};

const mapDispatchToProps: MapDispatchToPropsFunction<
	ITypeable & IValidatable,
	InputFieldProps
> = (dispatch, ownProps: InputFieldProps) => {
	return {
		onChange: (email) => {
			dispatch(setEmailAddress(email));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(InputField);
