import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import AutoCompleteBox from "./AutoCompleteBox";

describe("AutoCompleteBox", () => {
	it("renders with all props", () => {
		const allProps = {
			options: [
				{ optionId: 1, optionName: "Test 1" },
				{ optionId: 2, optionName: "Test 2" },
			],
			label: "Test Label",
			linkName: "/",
		};

        const tree = renderer.create(<AutoCompleteBox {...allProps} />);
        expect(tree).toMatchSnapshot();
	});
});
