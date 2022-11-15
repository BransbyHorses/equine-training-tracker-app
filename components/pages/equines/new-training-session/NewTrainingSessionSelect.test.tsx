import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import NewTrainingSessionSelect, {
	NewTrainingSessionSelectProps,
} from "./NewTrainingSessionSelect";

describe("NewTrainingSessionSelect", () => {
	it("renders empty select when no options are passed", () => {
		const props: NewTrainingSessionSelectProps = {
			categories: [],
			label: "Test Label",
			id: "test-select",
			handleChange: jest.fn(),
			value: "",
		};
		const tree = renderer.create(<NewTrainingSessionSelect {...props} />);
		expect(tree).toMatchSnapshot();
	});
	it("renders select when options are passed", () => {
		const props: NewTrainingSessionSelectProps = {
			categories: [
				{ id: 1, name: "Option 1" },
				{ id: 2, name: "Option 2" },
				{ id: 3, name: "Option 3" },
				{ id: 4, name: "Option 4" },
			],
			label: "Test Label",
			id: "test-select",
			handleChange: jest.fn(),
			value: "",
		};
		const tree = renderer.create(<NewTrainingSessionSelect {...props} />);
		expect(tree).toMatchSnapshot();
	});
});
