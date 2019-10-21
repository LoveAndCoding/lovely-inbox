import { faArrowLeft, faArrowRight } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Link } from "react-router-dom";

import HeartBeatLoadingIcon from "../../communication/loading";
import LovelyButton, { ButtonSizes } from "../../forms/components/button";
import Spring from "../../layout/components/spring";
import View, { ViewTags } from "../../layout/components/view";
import { COLORS, css, StyleSheet } from "../../styles";
import ActionPaneSmall from "../components/action.pane.small";

export default class OnboardServerSettings extends React.Component {
	public render() {
		return (
			<ActionPaneSmall>
				<HeartBeatLoadingIcon styles={styles.workingIcon} />
				<View styles={[styles.buttonBar]}>
					<Link to="/" className={css(styles.backLink)}>
						<span className={css(styles.buttonText)}>Back</span>
					</Link>
					<LovelyButton size={ButtonSizes.large} disabled={true}>
						<span className={css(styles.buttonText)}>Next</span>
						<FontAwesomeIcon
							icon={faArrowRight}
							className={css(styles.buttonIcon)}
						/>
					</LovelyButton>
				</View>
			</ActionPaneSmall>
		);
	}
}

const styles = StyleSheet.create({
	backLink: {
		"alignItems": "baseline",
		"border": "none",
		"borderRadius": 4,
		"color": COLORS.white,
		"cursor": "pointer",
		"display": "flex",
		"flex": 1,
		"flexDirection": "row",
		"fontSize": 20,
		"justifyContent": "center",
		"marginRight": 20,
		"minWidth": 160,
		"padding": "14px 20px",
		"textDecoration": "none",
		"width": "auto",

		"&:active, &:focus, &:hover": {
			backgroundColor: COLORS.black20,
			textDecoration: "none",
		},
	},
	buttonBar: {
		flexDirection: "row",
		margin: 20,
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
		textAlign: "center",
	},
	workingIcon: {
		display: "block",
		height: 200,
		margin: "auto",
		width: 200,
	},
});
