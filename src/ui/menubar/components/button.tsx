import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

import { COLORS, css, StyleSheet } from "../../styles";

interface IButtonProps {
	disabled?: boolean;
}

export default abstract class WindowBarButton extends React.Component<IButtonProps> {
	protected abstract get icon(): IconDefinition;
	protected abstract get text(): string;

	public render(): React.ReactElement {
		return (
			<button
				className={css(styles.button)}
				onClick={this.handleClick}
				title={this.text}
			>
				<FontAwesomeIcon icon={this.icon} />
			</button>
		);
	}

	protected abstract handleClick(
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	): void;
}

const styles = StyleSheet.create({
	button: {
		background: "transparent",
		border: "0px",
		color: COLORS.black,
		cursor: "pointer",
		display: "block",
		fontSize: 16,
		fontWeight: 900,
		padding: "4px 8px",
		textAlign: "center",
		userSelect: "none",
		width: 38,

		"&:active, &:focus, &:hover": {
			backgroundColor: COLORS.offWhite,
		},
	},
});
