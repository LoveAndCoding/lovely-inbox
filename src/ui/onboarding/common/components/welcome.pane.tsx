import * as React from "react";

import View, { ViewTags } from "../../../layout/components/view";
import { COLORS, css, StyleSheet } from "../../../styles";
import OnboardMenuBar from "./menubar";

import HeartBGImage from "../../../../../images/heart.bg.svg";

export default class WelcomeMessagePane extends React.Component<{
	header: string;
}> {
	public render() {
		const headerStyle = css(welcomeStyles.header);

		return (
			<View tag={ViewTags.section} styles={[welcomeStyles.welcome]}>
				<OnboardMenuBar />
				<h2 className={headerStyle}>{this.props.header}</h2>

				{this.props.children}
			</View>
		);
	}
}

export const welcomeStyles = StyleSheet.create({
	header: {
		fontSize: 60,
		fontWeight: 900,
		paddingBottom: 10,
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 25,
	},
	para: {
		fontSize: 24,
		fontWeight: 400,
		paddingBottom: 10,
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 25,
	},
	welcome: {
		backgroundColor: COLORS.white,
		backgroundImage: `url(${HeartBGImage})`,
		backgroundRepeat: "both",
		backgroundSize: 64,
		boxShadow: `1px 2px 4px rgba(20, 11, 4, 0.4)`,
		color: COLORS.darkBlue,
		fontSize: 24,
		marginBottom: 25,
		marginRight: 5,
		marginTop: 25,
	},
});
