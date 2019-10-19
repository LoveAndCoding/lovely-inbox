import * as React from "react";

import { Redirect } from "react-router";
import View, { ViewTags } from "../layout/components/view";
import { css, StyleSheet } from "../styles";
import OnboardAccountAdd from "./account/add";
import GettingStartedMessaging from "./welcome/get.started";

export default class InitialOnboardScreen extends React.Component<
	{},
	{ formSubmitted: boolean }
> {
	constructor() {
		super();
		this.state = { formSubmitted: false };
	}

	public render() {
		return (
			<View tag={ViewTags.section} styles={[styles.container]}>
				{this.state.formSubmitted && <Redirect to="/server-settings" />}
				<OnboardAccountAdd onNext={this.onNext} />
				<GettingStartedMessaging />
			</View>
		);
	}

	private onNext = () => {
		this.setState({ formSubmitted: true });
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
	},
});
