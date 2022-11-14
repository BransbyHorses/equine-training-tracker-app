import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import Footer from "./Footer";

describe("Footer", () => {
	it("renders", () => {
        const tree = renderer.create(<Footer />);
		expect(tree).toMatchSnapshot();
	});
});
