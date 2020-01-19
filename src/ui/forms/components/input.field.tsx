import * as React from "react";

import { COLORS, css, StyleSheet } from "../../styles";
import { ITypeable, IValidatable } from "../types";

const INPUT_ID_VAL = 0;

export enum InputFieldSizes {
	small = "small",
	medium = "medium",
	large = "large",
	xlarge = "xlarge",
}

type InputFieldTypes =
	| "color"
	| "date"
	| "email"
	| "number"
	| "search"
	| "tel"
	| "text"
	| "time"
	| "url";

type InputTypeProps =
	| {
			max?: number;
			min?: number;
			step?: number;
			type: "number";
	  }
	| {
			maxLength?: number;
			minLength?: number;
			type: "search" | "tel" | "text" | "url";
	  }
	| {
			type: "color" | "date" | "email" | "time";
	  };

export type InputFieldProps = InputTypeProps & {
	disabled?: boolean;
	label: string;
	placeholder: string;
	required?: boolean;
	size: InputFieldSizes;
} & ITypeable &
	IValidatable;

export default class InputField extends React.Component<InputFieldProps> {
	protected static defaultProps = {
		required: false,
		size: InputFieldSizes.medium,
	};
	private readonly inputId: string;

	constructor(props: InputFieldProps) {
		super(props);

		// Increment our global ID unique value and stash locally
		INPUT_ID_VAL++;
		this.inputId = `text-input-${INPUT_ID_VAL}`;
	}

	public render() {
		return (
			<React.Fragment>
				<label className={css(styles.label)} htmlFor={this.inputId}>
					{this.props.label}
				</label>
				<input
					className={css(styles.input, styles[this.props.size])}
					defaultValue={this.props.defaultValue}
					id={this.inputId}
					max={this.props.max}
					maxLength={this.props.maxLength}
					min={this.props.min}
					minLength={this.props.minLenght}
					onChange={this.handleChange}
					placeholder={this.props.placeholder}
					step={this.props.step}
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
