import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import Header from "./Header";

describe("Header", () => {
	it("renders", () => {
		const tree = renderer.create(<Header />);
		expect(tree).toMatchSnapshot();
	});
});
