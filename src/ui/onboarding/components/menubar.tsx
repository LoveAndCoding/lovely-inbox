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
		"-webkit-app-region": "drag",
		"-webkit-user-select": "none",
		"backgroundColor": "transparent",
		"display": "flex",
		"textAlign": "right",

		"& button": {
			"-webkit-app-region": "no-drag",
		},
	},
});
