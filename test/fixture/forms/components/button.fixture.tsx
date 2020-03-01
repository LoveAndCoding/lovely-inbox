import * as React from "react";
import * as TestRenderer from "react-test-renderer";

import LovelyButton, {
	ButtonColors,
	ButtonSizes,
	ButtonTypes,
} from "src/ui/forms/components/button";

describe("<LovelyButton>", () => {
	test("Default props render correctly", () => {
		// Arrange

		// Act
		const tree = TestRenderer.create(
			<LovelyButton>Default Button</LovelyButton>,
		).toJSON();

		// Assert
		expect(tree).toMatchSnapshot();
	});

	test("Color rendering changed via prop", () => {
		// Arrange

		// Act
		const tree = TestRenderer.create(
			<LovelyButton color={ButtonColors.light}>
				Light Button
			</LovelyButton>,
		).toJSON();

		// Assert
		expect(tree).toMatchSnapshot();
	});

	test("Size rendering changed via prop", () => {
		// Arrange

		// Act
		const tree = TestRenderer.create(
			<LovelyButton size={ButtonSizes.xsmall}>
				XSmall Button
			</LovelyButton>,
		).toJSON();

		// Assert
		expect(tree).toMatchSnapshot();
	});

	test("Type rendering changed via prop", () => {
		// Arrange

		// Act
		const tree = TestRenderer.create(
			<LovelyButton type={ButtonTypes.submit}>
				Submit Button
			</LovelyButton>,
		).toJSON();

		// Assert
		expect(tree).toMatchSnapshot();
	});

	test("Disabled rendering changed via prop", () => {
		// Arrange

		// Act
		const tree = TestRenderer.create(
			<LovelyButton disabled={true}>Submit Button</LovelyButton>,
		).toJSON();

		// Assert
		expect(tree).toMatchSnapshot();
	});
});
