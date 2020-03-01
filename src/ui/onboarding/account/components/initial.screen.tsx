import * as React from "react";

import { Redirect } from "react-router";
import View, { ViewTags } from "../../../layout/components/view";
import { css, StyleSheet } from "../../../styles";
import OnboardAccountAdd from "./add";
import GettingStartedMessaging from "./get.started";

export default class InitialOnboardScreen extends React.Component<
	{},
	{ formSubmitted: boolean }
> {
	constructor(props: {}) {
		super(props);
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

	public onNext = () => {
		this.setState({ formSubmitted: true });
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
	},
});
