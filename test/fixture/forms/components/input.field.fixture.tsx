import * as React from "react";
import * as TestRenderer from "react-test-renderer";

import InputField, {
	InputFieldSizes,
} from "src/ui/forms/components/input.field";
import { UNSAFE_resetUniqueIdCounters } from "src/ui/layout/uid.factory";

describe("<InputField>", () => {
	beforeEach(() => {
		// We need to reset the counters so our snapshot IDs are predictable
		UNSAFE_resetUniqueIdCounters();
	});

	test("Input type 'text' renders correctly", () => {
		// Arrange

		// Act
		const tree = TestRenderer.create(
			<InputField label="Text Test" type="text" />,
		).toJSON();

		// Assert
		expect(tree).toMatchSnapshot();
	});

	test("Input type 'text' with 'min/maxLength' renders correctly", () => {
		// Arrange

		// Act
		const tree = TestRenderer.create(
			<InputField
				label="Text Attr Test"
				maxLength={10}
				minLength={1}
				type="text"
			/>,
		).toJSON();

		// Assert
		expect(tree).toMatchSnapshot();
	});

	test("Input type 'number' renders correctly", () => {
		// Arrange

		// Act
		const tree = TestRenderer.create(
			<InputField label="Number Test" type="number" />,
		).toJSON();

		// Assert
		expect(tree).toMatchSnapshot();
	});

	test("Input type 'number' with 'min'/'max'/'step' renders correctly", () => {
		// Arrange

		// Act
		const tree = TestRenderer.create(
			<InputField
				label="Number Attr Test"
				max={10}
				min={1}
				step={0.1}
				type="number"
			/>,
		).toJSON();

		// Assert
		expect(tree).toMatchSnapshot();
	});

	test("Input type 'date' renders correctly", () => {
		// Arrange

		// Act
		const tree = TestRenderer.create(
			<InputField label="Date Test" type="date" />,
		).toJSON();

		// Assert
		expect(tree).toMatchSnapshot();
	});

	test("Input attr 'required' renders correctly", () => {
		// Arrange

		// Act
		const tree = TestRenderer.create(
			<InputField label="Required Attr Test" required type="number" />,
		).toJSON();

		// Assert
		expect(tree).toMatchSnapshot();
	});
});
