import { TrainingProgramme } from "./types";

export const findLatestTrainingProgramme = (
	trainingProgrammes: TrainingProgramme[]
) => {
	const filteredTrainingProgrammes = trainingProgrammes.filter(
		(t) => !t.endDate
	);
	return filteredTrainingProgrammes.length === 0
		? null
		: filteredTrainingProgrammes[0];
};
