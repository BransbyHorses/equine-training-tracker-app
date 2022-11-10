import {
	findCurrentTrainingProgramme,
	convertDateToString,
	findLastTrainingSession,
} from "./helpers";
import { TrainingProgramme } from "./types";

describe("find latest training programme in array", () => {
	test("returns only training programme without an end date", () => {
		const trainingProgrammes: TrainingProgramme[] = [
			{
				id: 1,
				trainingCategory: {},
				equine: {},
				skillProgressRecords: [],
				skillTrainingSessions: [],
				startDate: "2022-10-03",
				endDate: undefined,
			},
			{
				id: 2,
				trainingCategory: {},
				equine: {},
				skillProgressRecords: [],
				skillTrainingSessions: [],
				startDate: "2022-09-03",
				endDate: "2022-10-01",
			},
		];

		const result = findCurrentTrainingProgramme(trainingProgrammes);
		expect(result).toBe(trainingProgrammes[0]);
	});
	test("returns null if all training programmes have an end date", () => {
		const trainingProgrammes: TrainingProgramme[] = [
			{
				id: 1,
				trainingCategory: {},
				equine: {},
				skillProgressRecords: [],
				skillTrainingSessions: [],
				startDate: "2022-10-03",
				endDate: "2022-10-20",
			},
			{
				id: 2,
				trainingCategory: {},
				equine: {},
				skillProgressRecords: [],
				skillTrainingSessions: [],
				startDate: "2022-09-03",
				endDate: "2022-10-01",
			},
		];
		const result = findCurrentTrainingProgramme(trainingProgrammes);
		expect(result).toBeNull();
	});
	test("returns null if input array is empty", () => {
		const result = findCurrentTrainingProgramme([]);
		expect(result).toBeNull();
	});
});

describe("print date to user friendly steing", () => {
	test("correctly prints string", () => {
		const stringDate = convertDateToString("2022-10-15");
		expect(stringDate).toBe("15 October 2022");
	});
	test("returns empty string if value is falsy", () => {
		const stringDate = convertDateToString(undefined);
		expect(stringDate).toBe("");
	});
});

describe("find the last training session", () => {
	test("returns last training session based on date", () => {
		const skillTrainingSessions = [
			{
				id: 1,
				date: "2022-08-15",
			},
			{
				id: 1,
				date: "2022-06-15",
			},
			{
				id: 1,
				date: "2022-09-15",
			},
			{
				id: 1,
				date: "2022-07-15",
			},
		];
		const latestTrainingSession = findLastTrainingSession(
			skillTrainingSessions
		);
		expect(latestTrainingSession).toBe("2022-09-15");
	});
	test("returns null is argument is falsy", () => {
		const v = findLastTrainingSession(null);
		expect(v).toBeNull();
	});
});
