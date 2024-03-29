import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import NewTrainingSessionSummary, {
	convertDayJsDateToString,
} from "./NewTrainingSessionSummary";
import dayjs from "dayjs";
import { useNewSkillTrainingSession } from "../../../../utils/reducers/trainingSessionReducer";

jest.mock("../../../../utils/reducers/trainingSessionReducer.tsx", () => ({
	useNewSkillTrainingSession: jest.fn(),
}));

test("will convert dayJs date to string for request", () => {
	const dateString = "2022-10-10T16:30:11";
	const dayJsDate = dayjs(dateString);
	const formattedDate = convertDayJsDateToString(dayJsDate);
	expect(formattedDate).toBe("2022-10-10 16:30:11");
});

test("will add zero to single digit hour value", () => {
	const dateString = "2022-1-10T7:30:09";
	const dayJsDate = dayjs(dateString);
	const formattedDate = convertDayJsDateToString(dayJsDate);
	expect(formattedDate).toBe("2022-01-10 07:30:09");
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

test("will add zero to single digit month value", () => {
	const dateString = "2022-01-10T16:30:09";
	const dayJsDate = dayjs(dateString);
	const formattedDate = convertDayJsDateToString(dayJsDate);
	expect(formattedDate).toBe("2022-01-10 16:30:09");
});
test("will add zero to single digit minute value", () => {
	const dateString = "2022-01-10T16:03:09";
	const dayJsDate = dayjs(dateString);
	const formattedDate = convertDayJsDateToString(dayJsDate);
	expect(formattedDate).toBe("2022-01-10 16:03:09");
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
	it("renders with completed newTrainingSession", () => {
		(useNewSkillTrainingSession as jest.Mock).mockImplementation(() => {
			return {
				state: {
					formStage: "summary",
					newTrainingSession: {
						date: dayjs(),
						skill: { id: 1, name: "Test Skill" },
						environment: { id: 1, name: "Test Environment" },
						progressCode: "Ok",
						trainingMethod: { id: 1, name: "Test Method" },
						trainingTime: 0,
						notes: "Test notes.",
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
});
