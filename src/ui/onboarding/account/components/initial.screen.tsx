import * as React from "react";

import { Redirect } from "react-router";
import View, { ViewTags } from "../../../layout/components/view";
import { StyleSheet } from "../../../styles";
import OnboardAccountAdd from "./add";
import GettingStartedMessaging from "./get.started";

type InitialOnboardScreenProps = Record<string, unknown>;

export default class InitialOnboardScreen extends React.Component<
	InitialOnboardScreenProps,
	{ formSubmitted: boolean }
> {
	constructor(props: InitialOnboardScreenProps) {
		super(props);
		this.state = { formSubmitted: false };
	}

	public render(): React.ReactElement {
		return (
			<View tag={ViewTags.section} styles={[styles.container]}>
				{this.state.formSubmitted && <Redirect to="/server-settings" />}
				<OnboardAccountAdd onNext={this.onNext} />
				<GettingStartedMessaging />
			</View>
		);
	}

	public onNext = (): void => {
		this.setState({ formSubmitted: true });
	};
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
	},
});
