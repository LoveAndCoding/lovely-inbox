import * as React from "react";

import View, { ViewTags } from "../layout/components/view";
import { css, StyleSheet } from "../styles";
import OnboardServerSettings from "./account/server.settings";
import FindingServerMessaging from "./welcome/finding.server";

export default class ServerSettingsScreen extends React.Component {
	public render() {
		return (
			<View tag={ViewTags.section} styles={[styles.container]}>
				<OnboardServerSettings />
				<FindingServerMessaging />
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
