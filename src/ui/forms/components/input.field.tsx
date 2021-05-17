import * as React from "react";

import { getItemUniqueId } from "../../layout/uid.factory";
import { COLORS, css, StyleSheet } from "../../styles";
import { ITypeable, IValidatable } from "../types";

export enum InputFieldSizes {
	small = "small",
	medium = "medium",
	large = "large",
	xlarge = "xlarge",
}

interface INumberTypeProps {
	max?: number;
	min?: number;
	step?: number;
	type: "number";
}
interface IStringTypeProps {
	maxLength?: number;
	minLength?: number;
	type: "search" | "tel" | "text" | "url";
}
interface IOtherTypeProps {
	type: "color" | "date" | "email" | "time";
}

type InputTypeProps = INumberTypeProps | IStringTypeProps | IOtherTypeProps;

export interface IInputFieldStateProps {
	readonly defaultValue?: string;
	disabled?: boolean;
}

export type InputFieldDispatchProps = ITypeable & IValidatable;

export type InputFieldOwnProps = InputTypeProps & {
	inline?: boolean;
	label: string;
	placeholder?: string;
	required?: boolean;
	size?: InputFieldSizes;
};

export type InputFieldProps = InputFieldOwnProps &
	IInputFieldStateProps &
	InputFieldDispatchProps;

export default class InputField extends React.Component<InputFieldProps> {
	public static defaultProps = {
		required: false,
		size: InputFieldSizes.medium,
	};
	private readonly inputId: string;

	constructor(props: InputFieldProps) {
		super(props);
	}

	public render(): React.ReactElement {
		const id = getItemUniqueId(this, "text-input");

		return (
			<React.Fragment>
				<label
					className={css(
						styles.label,
						this.props.inline && styles[this.props.size],
					)}
					htmlFor={"#" + id}
				>
					{this.props.label}
				</label>
				<input
					className={css(styles.input, styles[this.props.size])}
					defaultValue={this.props.defaultValue}
					id={id}
					max={"max" in this.props ? this.props.max : null}
					maxLength={
						"maxLength" in this.props ? this.props.maxLength : null
					}
					min={"min" in this.props ? this.props.min : null}
					minLength={
						"minLength" in this.props ? this.props.minLength : null
					}
					onChange={this.handleChange}
					placeholder={this.props.placeholder}
					step={"step" in this.props ? this.props.step : null}
					type={this.props.type}
					required={this.props.required}
				/>
			</React.Fragment>
		);
	}

	private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (this.props.onChange) {
			const val = event.target.value.trim();
			this.props.onChange(val, event);
		}
	};
}

const styles = StyleSheet.create({
	input: {
		backgroundColor: COLORS.white,
		border: 0,
		borderRadius: 4,
		boxShadow: `3px 3px 2px ${COLORS.black40}`,
		display: "block",
		marginBottom: 16,

		"&:focus": {
			boxShadow: `3px 3px 1px ${COLORS.darkBlue}`,
			outline: "none",

			"&::placeholder": {
				opacity: 0.4,
			},
		},
	},
	label: {
		display: "block",
		lineHeight: "normal",
		marginBottom: 8,
	},

	// Sizes
	small: {
		fontSize: 14,
		padding: "4px 8px",
	},

	medium: {
		fontSize: 16,
		padding: "8px 12px",
	},

	large: {
		fontSize: 20,
		padding: "14px 20px",
	},

	xlarge: {
		fontSize: 24,
		padding: "20px 32px",
	},
});
