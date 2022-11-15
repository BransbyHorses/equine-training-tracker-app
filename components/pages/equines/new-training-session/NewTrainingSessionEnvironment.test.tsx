import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import NewTrainingSessionEnvironment from "./NewTrainingSessionEnvironment";
import { useNewSkillTrainingSession } from "../../../../utils/reducers/trainingSessionReducer";

jest.mock("../../../../utils/reducers/trainingSessionReducer.tsx", () => ({
	useNewSkillTrainingSession: jest.fn(),
}));
describe("NewTrainingSessionEnvironment", () => {
	it("renders with no value", () => {
		(useNewSkillTrainingSession as jest.Mock).mockImplementation(() => {
			return {
				state: {
					formStage: "environment",
					newTrainingSession: {
						date: undefined,
						skill: undefined,
						environment: undefined,
						progressCode: "",
						trainingMethod: undefined,
						trainingTime: 0,
						notes: "",
					},
					trainingProgramme: undefined,
				},
			};
		});
		const tree = renderer.create(<NewTrainingSessionEnvironment />);
		expect(tree).toMatchSnapshot();
	});
	it("renders with pre-populated value", () => {
		(useNewSkillTrainingSession as jest.Mock).mockImplementation(() => {
			return {
				state: {
					formStage: "environment",
					newTrainingSession: {
						date: undefined,
						skill: undefined,
						environment: { id: 1, name: "Environment" },
						progressCode: "",
						trainingMethod: undefined,
						trainingTime: 0,
						notes: "",
					},
					trainingProgramme: undefined,
				},
			};
		});
		render(<NewTrainingSessionEnvironment />);
		expect(screen.getByRole("option")).toHaveAttribute("value", "1");
	});
});
