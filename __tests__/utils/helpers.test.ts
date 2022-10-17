import { findCurrentTrainingProgramme } from "../../utils/helpers";
import { TrainingProgramme } from "../../utils/types";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

describe("find latest training programme in array", () => {
	test("returns only training programme without an end date", () => {
		const trainingProgrammes: TrainingProgramme[] = [
			{
				id: 1,
				trainingCategory: {
					id: 0,
					name: '',
					description: ''
				},
				equine: {
					id: 0,
					name: '',
					yard: {
						id: 0,
						name: ''
					},
					equineStatus: {
						id: 0,
						name: ''
					},
					trainingProgrammes: [],
					learnerType: {
						id: 0,
						name: ''
					}
				},
				skillProgressRecords: [],
				skillTrainingSessions: [],
				startDate: "2022-10-03",
				endDate: '',
			},
			{
				id: 1,
				trainingCategory: {
					id: 0,
					name: '',
					description: ''
				},
				equine: {
					id: 0,
					name: '',
					yard: {
						id: 0,
						name: ''
					},
					equineStatus: {
						id: 0,
						name: ''
					},
					trainingProgrammes: [],
					learnerType: {
						id: 0,
						name: ''
					}
				},
				skillProgressRecords: [],
				skillTrainingSessions: [],
				startDate: "2022-10-03",
				endDate: "2022-10-01",
			}
		];
		const result = findCurrentTrainingProgramme(trainingProgrammes);
		expect(result).toBe(trainingProgrammes[0]);
	});
	test("returns null if all training programmes have an end date", () => {
		const trainingProgrammes: TrainingProgramme[] = [
			{
				id: 1,
				trainingCategory: {
					id: 0,
					name: '',
					description: ''
				},
				equine: {
					id: 0,
					name: '',
					yard: {
						id: 0,
						name: ''
					},
					equineStatus: {
						id: 0,
						name: ''
					},
					trainingProgrammes: [],
					learnerType: {
						id: 0,
						name: ''
					}
				},
				skillProgressRecords: [],
				skillTrainingSessions: [],
				startDate: "2022-10-03",
				endDate: "2022-10-20",
			},
			{
				id: 1,
				trainingCategory: {
					id: 0,
					name: '',
					description: ''
				},
				equine: {
					id: 0,
					name: '',
					yard: {
						id: 0,
						name: ''
					},
					equineStatus: {
						id: 0,
						name: ''
					},
					trainingProgrammes: [],
					learnerType: {
						id: 0,
						name: ''
					}
				},
				skillProgressRecords: [],
				skillTrainingSessions: [],
				startDate: "2022-09-03",
				endDate: "2022-10-01",
			}
		];
		const result = findCurrentTrainingProgramme(trainingProgrammes);
		expect(result).toBeNull();
	});
	test("returns null if input array is empty", () => {
		const result = findCurrentTrainingProgramme([]);
		expect(result).toBeNull();
	});
});