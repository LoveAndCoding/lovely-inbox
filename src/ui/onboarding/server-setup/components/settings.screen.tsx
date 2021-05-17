import * as React from "react";

import View, { ViewTags } from "../../../layout/components/view";
import { StyleSheet } from "../../../styles";
import FindingServerMessaging from "./finding.server";
import OnboardServerSettings from "../containers/server.settings";

export default class ServerSettingsScreen extends React.Component {
	public render(): React.ReactElement {
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
