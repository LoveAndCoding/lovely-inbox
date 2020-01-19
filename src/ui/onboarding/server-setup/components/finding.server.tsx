import * as React from "react";

import View, { ViewTags } from "../../../layout/components/view";
import { COLORS, css, StyleSheet } from "../../../styles";
import WelcomeMessagePane, {
	welcomeStyles,
} from "../../common/components/welcome.pane";

export default class GettingStartedMessaging extends React.Component {
	public render() {
		const paraStyle = css(welcomeStyles.para);

		return (
			<WelcomeMessagePane header="Got It">
				<p className={paraStyle}>What a great email address!</p>

				<p className={paraStyle}>
					Now we'll look up where that email address is.
				</p>

				<p className={paraStyle}>
					We'll try our best to figure out how we can do that all on
					our own. If we can't figure it out, we may ask for a bit
					more info.
				</p>

				<p className={paraStyle}>
					Once we've got everything we need, click the login button to
					login to your email and start using the app.
				</p>
			</WelcomeMessagePane>
		);
	}
}

const styles = StyleSheet.create({
	pointerImage: {
		"-webkit-user-select": "none",
		bottom: 62,
		display: "block",
		height: 110,
		padding: 0,
		pointerEvents: "none",
		position: "absolute",
		width: 162,
	},
});
