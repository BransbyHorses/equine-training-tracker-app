import "@testing-library/jest-dom";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import NewTrainingSessionSkillMethod from "./NewTrainingSessionSkillMethod";
import { useNewSkillTrainingSession } from "../../../../utils/reducers/trainingSessionReducer";

jest.mock("../../../../utils/reducers/trainingSessionReducer.tsx", () => ({
	useNewSkillTrainingSession: jest.fn(),
}));

const formStage = "skillMethod";
const newTrainingSession = {
	date: undefined,
	skill: undefined,
	environment: undefined,
	progressCode: "",
	trainingMethod: undefined,
	trainingTime: 0,
	notes: "",
};
const trainingProgramme = {
	trainingCategory: { id: 1, name: "Test Category" },
	equine: { id: 1, name: "Test Equine" },
};

describe("NewTrainingSessionSkillMethod", () => {
	it("renders", () => {
		(useNewSkillTrainingSession as jest.Mock).mockImplementation(() => {
			return {
				state: {
					formStage,
					newTrainingSession,
					trainingProgramme,
				},
			};
		});
		const tree = renderer.create(<NewTrainingSessionSkillMethod />);
		expect(tree).toMatchSnapshot();
	});
	it("disables Continue button when skill and training-method selects are empty", () => {
		(useNewSkillTrainingSession as jest.Mock).mockImplementation(() => {
			return {
				state: {
					formStage,
					newTrainingSession,
					trainingProgramme,
				},
			};
		});
		render(<NewTrainingSessionSkillMethod />);
		expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
	});
	it("disables Continue button when skill select is empty", () => {
		(useNewSkillTrainingSession as jest.Mock).mockImplementation(() => {
			return {
				state: {
					formStage,
					newTrainingSession: {
						...newTrainingSession,
						trainingMethod: { id: 1, name: "Test Method" },
					},
					trainingProgramme,
				},
			};
		});
		render(<NewTrainingSessionSkillMethod />);
		expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
	});
	it("disabled Continue button when training method select is empty", () => {
		(useNewSkillTrainingSession as jest.Mock).mockImplementation(() => {
			return {
				state: {
					formStage,
					newTrainingSession: {
						...newTrainingSession,
						skill: { id: 1, name: "Test Skill" },
					},
					trainingProgramme,
				},
			};
		});
		render(<NewTrainingSessionSkillMethod />);
		expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
	});
	it("allows user to continue to next session", () => {
		(useNewSkillTrainingSession as jest.Mock).mockImplementation(() => {
			return {
				state: {
					formStage,
					newTrainingSession: {
						...newTrainingSession,
						skill: { id: 1, name: "Test Skill" },
						trainingMethod: { id: 1, name: "Test Method" },
					},
					trainingProgramme,
				},
			};
		});
		render(<NewTrainingSessionSkillMethod />);
		expect(screen.getByRole("button", { name: "Continue" })).not.toBeDisabled();
	});
});
