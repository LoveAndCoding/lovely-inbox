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
	transparentDark = "transparentDark",
	transparentLight = "transparentLight",
}

export enum ButtonTypes {
	button = "button",
	submit = "submit",
}

export interface ILovelyButtonStateProps {
	disabled?: boolean;
}

export type LovelyButtonDispatchProps = IClickable<HTMLButtonElement>;

export interface ILovelyButtonOwnProps {
	children: React.ReactNode;
	color?: ButtonColors;
	size?: ButtonSizes;
	type?: ButtonTypes;
}

export type LovelyButtonProps = ILovelyButtonStateProps &
	LovelyButtonDispatchProps &
	ILovelyButtonOwnProps;

export default class LovelyButton extends React.Component<LovelyButtonProps> {
	public static defaultProps = {
		color: ButtonColors.dark,
		disabled: false,
		size: ButtonSizes.medium,
		type: ButtonTypes.button,
	};

	constructor(props: LovelyButtonProps) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	public render(): React.ReactElement {
		return (
			<button
				className={css(
					styles.button,
					styles[this.props.size],
					styles[this.props.color],
					this.props.disabled && styles.disabled,
				)}
				disabled={this.props.disabled}
				onClick={this.handleClick}
				type={this.props.type}
			>
				{this.props.children}
			</button>
		);
	}

	private handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		const { disabled, onPress } = this.props;
		if (!disabled && onPress) {
			onPress(event);
		}
	}
}

const styles = StyleSheet.create({
	button: {
		alignItems: "center",
		border: "none",
		borderRadius: 4,
		cursor: "pointer",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		lineHeight: 1,
		width: "auto",
	},

	// Sizes
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
		minWidth: 160,
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

	// Colors
	dark: {
		backgroundColor: COLORS.darkPurple,
		boxShadow: `3px 3px 2px ${COLORS.black40}`,
		color: COLORS.white,

		"&:active, &:focus, &:hover": {
			backgroundColor: COLORS.black,
			boxShadow: `3px 3px 2px ${COLORS.black60}`,
		},
	},
	light: {
		backgroundColor: COLORS.white,
		boxShadow: `3px 3px 2px ${COLORS.black40}`,
		color: COLORS.darkBlue,

		"&:active, &:focus, &:hover": {
			backgroundColor: COLORS.offWhite,
		},
	},
	transparentDark: {
		backgroundColor: "transparent",
		color: COLORS.darkPurple,

		"&:active, &:focus, &:hover": {
			backgroundColor: COLORS.offWhite,
		},
	},
	transparentLight: {
		backgroundColor: "transparent",
		color: COLORS.white,

		"&:active, &:focus, &:hover": {
			backgroundColor: COLORS.offBlack,
		},
	},

	disabled: {
		opacity: 0.6,
	},
});
