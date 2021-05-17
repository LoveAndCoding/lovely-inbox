import * as React from "react";

import { COLORS, css, StyleSheet } from "../../styles";

export default class WindowTitle extends React.Component {
	public render(): React.ReactElement {
		return <h1 className={css(styles.text)}>{document.title}</h1>;
	}
}

const styles = StyleSheet.create({
	text: {
		color: COLORS.black,
		display: "block",
		flexGrow: 1,
		fontSize: 16,
		fontWeight: 200,
		padding: "4px 8px",
		textAlign: "left",
		userSelect: "none",
	},
});
