import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import NewTrainingSessionDate from "./NewTrainingSessionDate";

describe("NewTrainingSessionDate", () => {
	it("renders with minimum props", () => {
		const tree = renderer.create(<NewTrainingSessionDate />);
		expect(tree).toMatchSnapshot();
	});
});
