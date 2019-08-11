import * as React from "react";

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
	dragbar: {
		"-webkit-app-region": "drag",
		"-webkit-user-select": "none",
		"height": 30,
		"left": 0,
		"position": "absolute",
		"right": 0,
		"top": 0,
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
