import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import NewTrainingSessionSummary, {
	convertDayJsDateToString,
} from "./NewTrainingSessionSummary";
import dayjs from "dayjs";
import { useNewSkillTrainingSession } from "../../../../utils/reducers/trainingSessionReducer";
import { render, screen } from "@testing-library/react";

jest.mock("../../../../utils/reducers/trainingSessionReducer.tsx", () => ({
	useNewSkillTrainingSession: jest.fn(),
}));

test("will convert day js date to string for request", () => {
	const dateString = "2022-10-10T16:30:11";
	const dayJsDate = dayjs(dateString);
	const formattedDate = convertDayJsDateToString(dayJsDate);
	expect(formattedDate).toBe("2022-10-10 16:30:11");
});

test("will add zero to single digit day value", () => {
	const dateString = "2022-10-09T16:30:11";
	const dayJsDate = dayjs(dateString);
	const formattedDate = convertDayJsDateToString(dayJsDate);
	expect(formattedDate).toBe("2022-10-09 16:30:11");
});

test("will add zero to single digit second value", () => {
	const dateString = "2022-10-10T16:30:09";
	const dayJsDate = dayjs(dateString);
	const formattedDate = convertDayJsDateToString(dayJsDate);
	expect(formattedDate).toBe("2022-10-10 16:30:09");
});

describe("NewTrainingSessionSummary", () => {
	it("renders with no newTrainingSession", () => {
		(useNewSkillTrainingSession as jest.Mock).mockImplementation(() => {
			return {
				state: {
					formStage: "summary",
					newTrainingSession: {
						date: undefined,
						skill: undefined,
						environment: undefined,
						progressCode: "",
						trainingMethod: undefined,
						trainingTime: 0,
						notes: "",
					},
					trainingProgramme: {
						trainingCategory: { id: 1, name: "Test Category" },
						equine: { id: 1, name: "Test Equine" },
					},
				},
			};
		});
		const tree = renderer.create(<NewTrainingSessionSummary />);
		expect(tree).toMatchSnapshot();
	});
	it("disables submit button when newTrainingSession has falsy values", () => {
		(useNewSkillTrainingSession as jest.Mock).mockImplementation(() => {
			return {
				state: {
					formStage: "summary",
					newTrainingSession: {
						date: undefined,
						skill: undefined,
						environment: undefined,
						progressCode: "",
						trainingMethod: undefined,
						trainingTime: 0,
						notes: "",
					},
					trainingProgramme: {
						trainingCategory: { id: 1, name: "Test Category" },
						equine: { id: 1, name: "Test Equine" },
					},
				},
			};
		});
		render(<NewTrainingSessionSummary />);
		expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
	});
	it("allows submit button to be clicked when newTrainingSession values are complete", () => {
		(useNewSkillTrainingSession as jest.Mock).mockImplementation(() => {
			return {
				state: {
					formStage: "summary",
					newTrainingSession: {
						date: dayjs(),
						skill: { id: 1, name: "Test Skill" },
						environment: { id: 1, name: "Test Environment" },
						progressCode: "Ok",
						trainingMethod: { id: 1, name: "Test Training Method" },
						trainingTime: 0,
						notes: "",
					},
					trainingProgramme: {
						trainingCategory: { id: 1, name: "Test Category" },
						equine: { id: 1, name: "Test Equine" },
					},
				},
			};
		});
		render(<NewTrainingSessionSummary />);
		expect(screen.getByRole("button", { name: "Submit" })).toHaveAttribute(
			"disabled",
			""
		);
	});
});
