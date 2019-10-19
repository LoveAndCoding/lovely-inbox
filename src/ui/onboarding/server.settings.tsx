import * as React from "react";

import View, { ViewTags } from "../layout/components/view";
import { css, StyleSheet } from "../styles";

export default class ServerSettingsScreen extends React.Component {
	public render() {
		return (
			<View tag={ViewTags.section} styles={[styles.container]}>
				Setup Server
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
	},
});
