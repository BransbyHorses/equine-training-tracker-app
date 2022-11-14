import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import RadioButtonsForm from "./RadioButtonsForm";

describe("RadioButtonsForm", () => {
	it("renders with minimum props", () => {
		const props = {
			handleChange: () => null,
			items: [],
		};
		const tree = renderer.create(<RadioButtonsForm {...props} />);
		expect(tree).toMatchSnapshot();
	});
});
