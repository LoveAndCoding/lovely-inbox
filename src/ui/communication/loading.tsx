import * as React from "react";

import { css, CSSInputTypes, StyleSheet } from "../styles";

import * as HBAnimIcon from "../../../images/heart.beat.light.anim.svg";

export default class HeartBeatLoadingIcon extends React.Component<{
	alt: string;
	styles: CSSInputTypes[];
}> {
	protected static defaultProps = {
		alt: "We're working on getting this ready",
		styles: [],
	};

	public render() {
		return (
			<img
				src={HBAnimIcon}
				alt={this.props.alt}
				className={css(styles.icon, this.props.styles)}
			/>
		);
	}
}

const styles = StyleSheet.create({
	icon: {
		"-webkit-user-select": "none",
		"pointerEvents": "none",
	},
});
