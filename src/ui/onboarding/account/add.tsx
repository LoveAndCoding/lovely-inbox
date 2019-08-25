import { faArrowRight } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

import LovelyButton, {
	ButtonColors,
	ButtonSizes,
} from "../../forms/components/button";
import EmailTextField, {
	InputFieldSizes,
} from "../../forms/components/email.text.field";
import Spring from "../../layout/components/spring";
import View, { ViewTags } from "../../layout/components/view";
import { COLORS, css, StyleSheet } from "../../styles";

import * as LogoUrl from "../../../../images/icon.dark.svg";

export default class OnboardAccountAdd extends React.Component {
	public render() {
		return (
			<View tag={ViewTags.section} styles={[styles.add]}>
				<div className={css(styles.dragbar)} aria-hidden={true} />

				<h1 className={css(styles.header)}>
					<img
						src={LogoUrl}
						alt=""
						className={css(styles.logoImage)}
					/>
					Lovely Inbox
				</h1>

				<View tag={ViewTags.form} styles={[styles.form]}>
					<EmailTextField size={InputFieldSizes.large} />
					<View styles={[styles.buttonBar]}>
						<Spring />
						<LovelyButton size={ButtonSizes.large}>
							<span className={css(styles.buttonText)}>Next</span>
							<FontAwesomeIcon
								icon={faArrowRight}
								className={css(styles.buttonIcon)}
							/>
						</LovelyButton>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	add: {
		backgroundColor: COLORS.BRAND.red,
		boxShadow: `1px 2px 4px rgba(20, 11, 4, 0.6)`,
		color: COLORS.white,
		flexBasis: 380,
		flexShrink: 0,
		fontSize: 24,
		marginleft: 3,
		zIndex: 1,
	},
	buttonBar: {
		flexDirection: "row",
	},
	buttonIcon: {
		// The FA Icon seems to look better centered rather than at baseline
		"alignSelf": "center",

		"button:active > &, button:focus > &, button:hover > &": {
			animationDirection: "alternate",
			animationDuration: "0.3s",
			animationFillMode: "forwards",
			animationIterationCount: "3",
			animationName: [
				{
					from: {
						transform: "translate(0px, 0px)",
					},
					to: {
						transform: "translate(6px, 0px)",
					},
				},
			],
		},
	},
	buttonText: {
		flex: 1,
	},
	dragbar: {
		"-webkit-app-region": "drag",
		"-webkit-user-select": "none",
		"height": 30,
		"left": 0,
		"position": "absolute",
		"right": 0,
		"top": 0,
	},
	form: {
		margin: 20,
	},
	header: {
		"-webkit-user-select": "none",
		"fontSize": 48,
		"fontWeight": 200,
		"margin": "auto",
	},
	logoImage: {
		display: "block",
		height: 200,
		marginBottom: -30,
		marginLeft: "auto",
		marginRight: "auto",
		pointerEvents: "none",
		width: 200,
	},
});
