import React, { useState, useEffect } from "react";
import axios from "axios";
import { SkillTrainingSession, TrainingProgramme } from "../types";

const useTrainingHistoryPage = (
	equineId?: string
): {
	fetchingData: boolean;
	trainingHistory: {
		trainingProgramme?: TrainingProgramme | undefined;
		skillTrainingSessions: SkillTrainingSession[] | [];
	};
	error: boolean;
} => {
	const [trainingHistory, setTrainingHistory] = useState<{
		trainingProgramme: TrainingProgramme | undefined;
		skillTrainingSessions: SkillTrainingSession[] | undefined;
	}>({
		trainingProgramme: undefined,
		skillTrainingSessions: [],
	});
	const [fetchingData, setFetchingData] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setFetchingData(true);
		if (equineId) {
			Promise.all([
				axios.get(
					`${process.env.NEXT_PUBLIC_URL}/data/equines/${equineId}/training-programmes/latest`
				),
				axios.get(
					`${process.env.NEXT_PUBLIC_URL}/data/equines/${equineId}/skill-training-sessions`
				),
			])
				.then((data) => {
					const [trainingProgramme, skillTrainingSessions] = data;
					setTrainingHistory({
						trainingProgramme: trainingProgramme.data,
						skillTrainingSessions: skillTrainingSessions.data,
					});
					setFetchingData(false);
					setError(false);
				})
				.catch((err) => {
					setFetchingData(false);
					setError(false);
					console.error(err);
				});
		}
	}, [equineId]);

	return {
		trainingHistory,
		fetchingData,
		error,
	};
};

export default useTrainingHistoryPage;
