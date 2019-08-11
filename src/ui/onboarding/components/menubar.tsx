import * as React from "react";

import Spring from "../../components/spring";
import View from "../../components/view";
import WindowClose from "../../menubar/components/close";
import WindowMinimize from "../../menubar/components/minimize";
import { COLORS, css, StyleSheet } from "../../styles";

export default class OnboardMenuBar extends React.Component {
	public render() {
		return (
			<View styles={[styles.bar]}>
				<Spring />
				<WindowMinimize />
				<WindowClose />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	bar: {
		"-webkit-app-region": "drag",
		"-webkit-user-select": "none",
		"flexDirection": "row",

		"& button": {
			"-webkit-app-region": "no-drag",
		},
	},
});
