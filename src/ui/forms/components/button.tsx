import * as React from "react";

import { COLORS, css, StyleSheet } from "../../styles";
import { IClickable } from "../types";

export enum ButtonSizes {
	xxsmall = "xxsmall",
	xsmall = "xsmall",
	small = "small",
	medium = "medium",
	large = "large",
	xlarge = "xlarge",
	xxlarge = "xxlarge",
}

export enum ButtonColors {
	dark = "dark",
	light = "light",
}

type LovelyButtonProps = {
	size: ButtonSizes;
	color: ButtonColors;
} & IClickable;

export default class LovelyButton extends React.Component<Button> {
	protected static defaultProps = {
		size: ButtonSizes.medium,
		color: ButtonColors.dark,
	};

	public render() {
		return (
			<button
				className={css(
					styles.button,
					styles[this.props.size],
					styles[this.props.color],
				)}
				type="button"
			>
				{this.props.children}
			</button>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		alignItems: "baseline",
		border: "none",
		borderRadius: 4,
		cursor: "pointer",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		width: "auto",
	},
	xxsmall: {
		fontSize: 10,
		minWidth: 0,
		padding: "1px 3px",
	},
	xsmall: {
		fontSize: 12,
		minWidth: 20,
		padding: "3px 5px",
	},
	small: {
		fontSize: 14,
		minWidth: 40,
		padding: "4px 8px",
	},
	medium: {
		fontSize: 16,
		minWidth: 120,
		padding: "8px 12px",
	},
	large: {
		fontSize: 20,
		minWidth: 180,
		padding: "14px 20px",
	},
	xlarge: {
		fontSize: 24,
		minWidth: 220,
		padding: "20px 32px",
	},
	xxlarge: {
		fontSize: 32,
		minWidth: 300,
		padding: "26px 42px",
	},
	dark: {
		"backgroundColor": COLORS.darkBlue,
		"boxShadow": `3px 3px 2px ${COLORS.black40}`,
		"color": COLORS.white,

		"&:active, &:focus, &:hover": {
			backgroundColor: COLORS.black,
		},
	},
	light: {
		"backgroundColor": COLORS.white,
		"boxShadow": `3px 3px 2px ${COLORS.black40}`,
		"color": COLORS.darkBlue,

		"&:active, &:focus, &:hover": {
			backgroundColor: COLORS.offWhite,
		},
	},
});
