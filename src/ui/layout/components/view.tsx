import * as React from "react";

import { css, CSSInputTypes, StyleSheet } from "../../styles";

export enum ViewTags {
	aside = "aside",
	div = "div",
	main = "main",
	nav = "nav",
	section = "section",
}

type ViewProps = {
	styles: CSSInputTypes[];
	tag: ViewTags;
} & React.HTMLAttributes;

export default class View extends React.Component<ViewProps> {
	private static defaultProps = {
		styles: [],
		tag: ViewTags.div,
	};

	public render() {
		const attributes = { ...this.props };
		attributes.className = css(styles.view, this.props.styles);

		delete attributes.tag;
		delete attributes.styles;

		return React.createElement(
			this.props.tag,
			attributes,
			this.props.children,
		);
	}
}

const styles = StyleSheet.create({
	view: {
		display: "flex",
		flexDirection: "column",
		margin: 0,
		padding: 0,
		position: "relative",
		zIndex: 0,
	},
});
