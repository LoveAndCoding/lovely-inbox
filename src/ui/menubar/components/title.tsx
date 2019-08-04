import * as React from "react";

import { COLORS, css, StyleSheet } from "../../styles";

export default class WindowTitle extends React.Component<{}> {
	public render() {
		return <h1 className={css(styles.text)}>{document.title}</h1>;
	}
}

const styles = StyleSheet.create({
	text: {
		flexGrow: 1,
		color: COLORS.white,
		display: "block",
		fontSize: 16,
		fontWeight: 200,
		padding: "4px 8px",
		textAlign: "left",
		userSelect: "none",
	},
});
