import * as React from "react";

import { css, CSSInputTypes, StyleSheet } from "../../styles";

export enum ViewTags {
	aside = "aside",
	div = "div",
	form = "form",
	main = "main",
	nav = "nav",
	section = "section",
}

type ViewProps =
	| ({
			styles: CSSInputTypes[];
			tag: ViewTags.form;
	  } & React.HTMLAttributes<HTMLFormElement>)
	| ({
			styles: CSSInputTypes[];
			tag: ViewTags.div;
	  } & React.HTMLAttributes<HTMLDivElement>)
	| ({
			styles: CSSInputTypes[];
			tag:
				| ViewTags.aside
				| ViewTags.main
				| ViewTags.nav
				| ViewTags.section;
	  } & React.HTMLAttributes<HTMLElement>);

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
