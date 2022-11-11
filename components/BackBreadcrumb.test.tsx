import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import BackBreadcrumb from "./BackBreadcrumb";

describe("BackBreadcrumb", () => {
	it("renders with all props", () => {
		const tree = renderer.create(<BackBreadcrumb link="/" />);
		expect(tree).toMatchSnapshot();
	});
});
