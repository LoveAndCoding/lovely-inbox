import * as React from "react";

import View, { ViewTags } from "../../layout/components/view";
import { COLORS, css, StyleSheet } from "../../styles";
import OnboardMenuBar from "../components/menubar";

import * as PointerImage from "../../../../images/fill.in.svg";
import * as HeartBGImage from "../../../../images/heart.bg.svg";

export default class GettingStartedMessaging extends React.Component {
	public render() {
		const headerStyle = css(styles.allText, styles.header);
		const paraStyle = css(styles.allText, styles.paragraph);
		const sideNoteStyle = css(
			styles.allText,
			styles.paragraph,
			styles.note,
		);

		return (
			<View tag={ViewTags.section} styles={[styles.welcome]}>
				<OnboardMenuBar />
				<h2 className={headerStyle}>Welcome!</h2>

				<p className={paraStyle}>Let’s get things all set up</p>

				<p className={paraStyle}>
					We’ll walk you through adding your first account to the app,
					and get you up and running in no time
				</p>

				<p className={paraStyle}>First, what’s your email address?</p>

				<p className={sideNoteStyle}>
					(if you have several, pick one and we'll work on the rest of
					them later)
				</p>

				<img
					src={PointerImage}
					alt=""
					className={css(styles.pointerImage)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	allText: {
		paddingBottom: 10,
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 25,
	},
	header: {
		fontSize: 60,
		fontWeight: 900,
	},
	note: {
		color: COLORS.offBlack,
		fontSize: 18,
		fontStyle: "italic",
	},
	paragraph: {
		fontSize: 24,
		fontWeight: 400,
	},
	pointerImage: {
		"-webkit-user-select": "none",
		"bottom": 62,
		"display": "block",
		"height": 110,
		"pointerEvents": "none",
		"position": "absolute",
		"width": 162,
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
