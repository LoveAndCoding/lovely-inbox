/**
 * Aphrodite + Our Extensions
 */
import { StyleSheet as Aphrodite } from "aphrodite";

const { StyleSheet, css } = Aphrodite.extend([
	{
		/**
		 * Base Selector References
		 *
		 * This allows the referencing of the base selector in a sub-element
		 * selector rule using the & character
		 *
		 * Example:
		 *     foo: {
		 *       '&.bar': { ... styles },
		 *       '.baz &': { ... styles },
		 *     }
		 * Compiles to:
		 *     .foo.bar { ... styles }
		 *     .baz .foo { ... styles }
		 */
		selectorHandler: (selector, baseSelector, generateSubtreeStyles) => {
			if (!selector.includes("&")) {
				return null;
			}

			return generateSubtreeStyles(selector.replace(/&/g, baseSelector));
		},
	},
	{
		/**
		 * Multi-selector References
		 *
		 * This allows for using a comma separated sub selector to select
		 * using multiple selectors at once
		 *
		 * Example:
		 *     foo: {
		 *       ':active,:focus': { ... styles },
		 *     }
		 * Compiles to:
		 *     foo:active { ... styles }
		 *     foo:focus { ... styles }
		 */
		selectorHandler: (selector, baseSelector, generateSubtreeStyles) => {
			if (!selector.includes(",")) {
				return null;
			}

			const selectList = selector.split(",");
			const generated = [];
			selectList.forEach((sel) => {
				const selGen = generateSubtreeStyles(sel);
				if (selGen) {
					generated.push(selGen);
				}
			});

			if (generated.length === 0) {
				return null;
			}
			return generated;
		},
	},
]);

const COLORS = {
	BRAND: {
		red: "#D63854",
	},
	black: "#100A06",
	offBlack: "#2f2c24",
	offWhite: "#efeae7",
	white: "#F4F0EF",
};

const FONTS = {
	monospace: "'Source Code Pro', 'Courier New', Courier, monospace",
	standard: "inherit",
};

export { COLORS, FONTS, StyleSheet, css };
export default Aphrodite;
