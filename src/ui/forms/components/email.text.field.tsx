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

type EmailFieldProps = {
	size: InputFieldSizes;
} & ITypeable &
	IValidatable;

export default class EmailTextField extends React.Component<EmailFieldProps> {
	protected static defaultProps = {
		size: InputFieldSizes.medium,
	};
	private readonly inputId: string;

	constructor(props) {
		super(props);

		// Increment our global ID unique value and stash locally
		INPUT_ID_VAL++;
		this.inputId = `email-text-input-${INPUT_ID_VAL}`;
	}

	public render() {
		return (
			<React.Fragment>
				<label className={css(styles.label)} htmlFor={this.inputId}>
					Email
				</label>
				<input
					className={css(styles.input, styles[this.props.size])}
					id={this.inputId}
					placeholder="kairi@destiny.island"
					type="email"
				/>
			</React.Fragment>
		);
	}
}

const styles = StyleSheet.create({
	input: {
		"backgroundColor": COLORS.white,
		"border": 0,
		"borderRadius": 4,
		"boxShadow": `3px 3px 2px ${COLORS.black40}`,
		"display": "block",
		"marginBottom": 16,

		"&:focus": {
			"boxShadow": `3px 3px 1px ${COLORS.darkBlue}`,
			"outline": "none",

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
