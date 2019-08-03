import * as React from "react";

import WindowClose from "../../menubar/components/close";
import WindowMinimize from "../../menubar/components/minimize";
import { COLORS, css, StyleSheet } from "../../styles";

export default class OnboardMenuBar extends React.Component {
	public render() {
		return (
			<div className={css(styles.bar)}>
				<WindowMinimize onLightBackground={true} />
				<WindowClose onLightBackground={true} />
			</div>
		);
	}
}

const styles = StyleSheet.create({
	bar: {
		"textAlign": "right",
		"backgroundColor": "transparent",
		"height": 20,
		"padding": 3,
		"-webkit-app-region": "drag",

		"& button": {
			"-webkit-app-region": "no-drag",
		},
	},
});
