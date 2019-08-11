import * as React from "react";

import View, { ViewTags } from "../layout/components/view";
import { css, StyleSheet } from "../styles";
import OnboardAccountAdd from "./account/add";
import GettingStartedMessaging from "./welcome/get.started";

export default class InitialOnboardScreen extends React.Component {
	public render() {
		return (
			<View tag={ViewTags.section} styles={[styles.container]}>
				<OnboardAccountAdd />
				<GettingStartedMessaging />
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
