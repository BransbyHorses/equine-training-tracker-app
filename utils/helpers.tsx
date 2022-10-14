import { TrainingProgramme } from "./types";

export const findCurrentTrainingProgramme = (
	trainingProgrammes?: TrainingProgramme[]
) => {
	if (!trainingProgrammes) {
		return null;
	}

	const filteredTrainingProgrammes = trainingProgrammes.filter(
		(t) => !t.endDate
	);
	return filteredTrainingProgrammes.length === 0
		? null
		: filteredTrainingProgrammes[0];
};

export const convertDateToString = (dateString?: string) => {
	if (!dateString) return "";

	const date = new Date(dateString);
	return date.toLocaleString("en-GB", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};