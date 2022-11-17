import renderer from "react-test-renderer";
import dayjs from "dayjs";
import {
	NewSkillTrainingSessionType,
	NewTrainingSessionProvider,
	NewTrainingSessionState,
	skillTrainingSessionReducer,
} from "./trainingSessionReducer";

describe("newTrainingSession reducer", () => {
	let initialState: NewTrainingSessionState;

	beforeEach(() => {
		initialState = {
			formStage: "date",
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
		};
	});

	it("updates formStage value", () => {
		const newState = skillTrainingSessionReducer(initialState, {
			type: NewSkillTrainingSessionType.GO_TO,
			payload: "summary",
		});
		expect(newState.formStage).toBe("summary");
	});

	it("updates formStage value to next value", () => {
		const newState = skillTrainingSessionReducer(initialState, {
			type: NewSkillTrainingSessionType.NEXT,
		});
		expect(newState.formStage).toBe("skillMethod");
	});

	it("updates formStage value to previous value", () => {
		initialState.formStage = "environment";
		const newState = skillTrainingSessionReducer(initialState, {
			type: NewSkillTrainingSessionType.BACK,
		});
		expect(newState.formStage).toBe("skillMethod");
	});
	it("updates trainingProgramme value", () => {
		const newState = skillTrainingSessionReducer(initialState, {
			type: NewSkillTrainingSessionType.SET_TRAINING_PROGRAMME,
			payload: { id: 1 },
		});
		expect(newState.trainingProgramme).toBeTruthy();
	});
	it("updates date value", () => {
		const newState = skillTrainingSessionReducer(initialState, {
			type: NewSkillTrainingSessionType.SET_DATE,
			payload: dayjs(),
		});
		expect(newState.newTrainingSession.date).toBeTruthy();
	});
	it("updates skill value", () => {
		const newState = skillTrainingSessionReducer(initialState, {
			type: NewSkillTrainingSessionType.SET_SKILL,
			payload: { id: 1, name: "Test Skill" },
		});
		expect(newState.newTrainingSession.skill).toBeTruthy();
	});
	it("updates environment value", () => {
		const newState = skillTrainingSessionReducer(initialState, {
			type: NewSkillTrainingSessionType.SET_ENVIRONMENT,
			payload: { id: 1, name: "Test Environment" },
		});
		expect(newState.newTrainingSession.environment).toBeTruthy();
	});
	it("updates progress code value", () => {
		const newState = skillTrainingSessionReducer(initialState, {
			type: NewSkillTrainingSessionType.SET_PROGRESS_CODE,
			payload: "Ok",
		});
		expect(newState.newTrainingSession.progressCode).toBeTruthy();
	});
	it("updates method value", () => {
		const newState = skillTrainingSessionReducer(initialState, {
			type: NewSkillTrainingSessionType.SET_TRAINING_METHOD,
			payload: { id: 1, name: "Test Method" },
		});
		expect(newState.newTrainingSession.trainingMethod).toBeTruthy();
	});
	it("updates time value", () => {
		const newState = skillTrainingSessionReducer(initialState, {
			type: NewSkillTrainingSessionType.SET_TRAINING_TIME,
			payload: 15,
		});
		expect(newState.newTrainingSession.trainingTime).toBeTruthy();
	});
	it("updates notes value", () => {
		const newState = skillTrainingSessionReducer(initialState, {
			type: NewSkillTrainingSessionType.SET_NOTES,
			payload: "Test Notes",
		});
		expect(newState.newTrainingSession.notes).toBeTruthy();
	});
	it("resets values", () => {
		const newState = skillTrainingSessionReducer(initialState, {
			type: NewSkillTrainingSessionType.RESET,
		});
		expect(newState.formStage).toBe("date");
		expect(newState.newTrainingSession).toEqual(
			initialState.newTrainingSession
		);
		expect(newState.trainingProgramme).toBe(undefined);
	});
});

describe("NewTrainingSession provider", () => {
	it("renders", () => {
		const tree = renderer.create(
			<NewTrainingSessionProvider>
				<div>app</div>
			</NewTrainingSessionProvider>
		);
		expect(tree).toMatchSnapshot();
	});
});
