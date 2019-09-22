import * as React from "react";
import * as TestRenderer from "react-test-renderer";

import LovelyButton, {
	ButtonColors,
	ButtonSizes,
} from "src/ui/forms/components/button";

describe("<LovelyButton>", () => {
	test("Default props render correctly", () => {
		// Arrange
		const onPress = (): void => null;

		// Act
		const tree = TestRenderer.create(
			<LovelyButton onPress={onPress}>Default Button</LovelyButton>,
		).toJSON();

		// Assert
		expect(tree).toMatchSnapshot();
	});

	test("Color rendering class changed via prop", () => {
		// Arrange
		const onPress = (): void => null;

		// Act
		const tree = TestRenderer.create(
			<LovelyButton color={ButtonColors.light} onPress={onPress}>
				Light Button
			</LovelyButton>,
		).toJSON();

		// Assert
		expect(tree).toMatchSnapshot();
	});

	test("Size rendering class changed via prop", () => {
		// Arrange
		const onPress = (): void => null;

		// Act
		const tree = TestRenderer.create(
			<LovelyButton size={ButtonSizes.xsmall} onPress={onPress}>
				XSmall Button
			</LovelyButton>,
		).toJSON();

		// Assert
		expect(tree).toMatchSnapshot();
	});
});
