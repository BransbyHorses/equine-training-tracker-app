import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import LoadingSpinner from "./LoadingSpinner";

describe("LoadingSpinner", () => {
	it("renders", () => {
		const tree = renderer.create(<LoadingSpinner />);
		expect(tree).toMatchSnapshot();
	});
});
