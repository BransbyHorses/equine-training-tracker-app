import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";

describe("Navbar", () => {
	it("renders", () => {
		const tree = renderer.create(<Navbar />);
		expect(tree).toMatchSnapshot();
	});
});
