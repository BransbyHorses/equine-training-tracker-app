import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import NavigationGrid from "./NavigationGrid";

describe("NavigationGrid", () => {
	it("renders", () => {
		const tree = renderer.create(<NavigationGrid />);
		expect(tree).toMatchSnapshot();
	});
});
