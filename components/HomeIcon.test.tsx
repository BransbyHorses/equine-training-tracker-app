import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import HomeIcon from "./HomeIcon";

describe("HomeIcon", () => {
	it("renders", () => {
		const tree = renderer.create(<HomeIcon />);
		expect(tree).toMatchSnapshot();
	});
});
