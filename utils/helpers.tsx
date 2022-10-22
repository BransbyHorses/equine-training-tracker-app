import { TrainingProgramme, SkillTrainingSession } from "./types";

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

export const findLastTrainingSession = (
	skillTrainingSessions?: SkillTrainingSession[]
) => {
	if (!skillTrainingSessions || skillTrainingSessions.length === 0) return null;

	const sortedRecordsByDate = skillTrainingSessions.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});

	return sortedRecordsByDate[0];
};
