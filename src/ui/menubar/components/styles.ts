import { COLORS, css, FONTS, StyleSheet } from "../../styles";

const styles = StyleSheet.create({
	button: {
		"background": "transparent",
		"border": "0px",
		"color": COLORS.white,
		"display": "inline-block",
		"fontFamily": FONTS.monospace,
		"fontWeight": 900,
		"height": 22,
		"padding": "2px 6px",
		"textAlign": "center",
		"width": 28,
		"userSelect": "none",

		"&:active, &:focus, &:hover": {
			backgroundColor: COLORS.black,
		},
	},
	buttonDark: {
		"color": COLORS.black,

		"&:active, &:focus, &:hover": {
			backgroundColor: COLORS.offWhite,
		},
	},
});

export default {
	button: css(styles.button),
	buttonDark: css(styles.button, styles.buttonDark),
};
