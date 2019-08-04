import * as React from "react";

import WindowClose from "../../menubar/components/close";
import WindowMinimize from "../../menubar/components/minimize";
import WindowTitle from "../../menubar/components/title";
import { COLORS, css, StyleSheet } from "../../styles";

export default class OnboardMenuBar extends React.Component {
	public render() {
		return (
			<div className={css(styles.bar)}>
				<WindowTitle />
				<WindowMinimize />
				<WindowClose />
			</div>
		);
	}
}

const styles = StyleSheet.create({
	bar: {
		"display": "flex",
		"textAlign": "right",
		"backgroundColor": "transparent",
		"-webkit-user-select": "none",
		"-webkit-app-region": "drag",

		"& button": {
			"-webkit-app-region": "no-drag",
		},
	},
});
