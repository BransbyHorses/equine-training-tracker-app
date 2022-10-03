import { findLatestTrainingProgramme } from "./helpers";
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

		const result = findLatestTrainingProgramme(trainingProgrammes);
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
		const result = findLatestTrainingProgramme(trainingProgrammes);
		expect(result).toBeNull();
	});
	test("returns null if input array is empty", () => {
		const result = findLatestTrainingProgramme([]);
		expect(result).toBeNull();
	});
});
