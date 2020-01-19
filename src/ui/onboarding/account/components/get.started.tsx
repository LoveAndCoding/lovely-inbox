import * as React from "react";

import View, { ViewTags } from "../../../layout/components/view";
import { COLORS, css, StyleSheet } from "../../../styles";
import WelcomeMessagePane, {
	welcomeStyles,
} from "../../common/components/welcome.pane";

import PointerImage from "../../../../../images/fill.in.svg";

export default class GettingStartedMessaging extends React.Component {
	public render() {
		const paraStyle = css(welcomeStyles.para);

		return (
			<WelcomeMessagePane header="Welcome!">
				<p className={paraStyle}>Let’s get things all set up</p>

				<p className={paraStyle}>
					We’ll walk you through adding your first account to the app,
					and get you up and running in no time
				</p>

				<p className={paraStyle}>First, what’s your email address?</p>

				<img
					src={PointerImage}
					alt=""
					className={css(styles.pointerImage)}
				/>
			</WelcomeMessagePane>
		);
	}
}

const styles = StyleSheet.create({
	note: {
		color: COLORS.offBlack,
		fontSize: 18,
		fontStyle: "italic",
	},
	pointerImage: {
		"-webkit-user-select": "none",
		bottom: 100,
		display: "block",
		height: 110,
		padding: 0,
		pointerEvents: "none",
		position: "absolute",
		width: 162,
	},
});
