import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import EquineListGrid from "./EquineListGrid";
import { Equine } from "../utils/types";

describe("EquineListGrid", () => {
	it("renders with all props", () => {
		const equines: Equine[] = [
			{
				id: 1,
				name: "Test",
				yard: { id: 1, name: "Test" },
				equineStatus: {
					string: "In Training",
					id: 1,
					categorisedAsTraining: true,
				},
				trainingProgrammes: [],
				learnerType: { id: 1, name: "test" },
				healthAndSafetyFlags: [],
				disruptions: [],
			},
			{
				id: 2,
				name: "Test",
				yard: { id: 1, name: "Test" },
				equineStatus: {
					string: "In Training",
					id: 1,
					categorisedAsTraining: true,
				},
				trainingProgrammes: [],
				learnerType: { id: 1, name: "test" },
				healthAndSafetyFlags: [],
				disruptions: [],
			},
		];
		const tree = renderer.create(<EquineListGrid equines={equines} />);
		expect(tree).toMatchSnapshot();
	});
});
