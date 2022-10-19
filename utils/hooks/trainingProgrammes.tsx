import { useState, useEffect } from "react";
import axios from "axios";
import { TrainingProgramme } from "../types";

export const useTrainingProgrammes = (
	equineId?: string
): {
	fetchingData: boolean;
	trainingProgrammes: TrainingProgramme[] | [];
	error: boolean;
} => {
	const [trainingProgrammes, setTrainingProgrammes] = useState([]);
	const [fetchingData, setFetchingData] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setFetchingData(true);
		if (equineId) {
			axios
				.get(
					`${process.env.NEXT_PUBLIC_URL}/data/equines/${equineId}/training-programmes`
				)
				.then(({ data }) => {
					setTrainingProgrammes(data);
					setFetchingData(false);
				})
				.catch((err) => {
					console.error(
						`Failed to fetch training programmes. Failed with error message: ${err}.`
					);
					setFetchingData(false);
					setError(true);
				});
		}
	}, [equineId]);

	return {
		trainingProgrammes,
		fetchingData,
		error,
	};
};

export const useTrainingProgramme = (trainingProgrammeId: {
	trainingProgrammeId?: string
}): {
	fetchingData: boolean;
	trainingProgramme: TrainingProgramme | undefined;
	error: boolean;
} => {
	const [trainingProgramme, setTrainingProgramme] = useState(undefined);
	const [fetchingData, setFetchingData] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (trainingProgrammeId) {
			setFetchingData(true);
			axios
				.get(
					`${process.env.NEXT_PUBLIC_URL}data/training-programmes/${trainingProgrammeId}`
				)
				.then(({ data }) => {
					setTrainingProgramme(data);
					setFetchingData(false);
				})
				.catch((err) => {
					console.error(
						`Failed to fetch training programme. Failed with error message: ${err}.`
					);
					setFetchingData(false);
					setError(true);
				});
		} else {
			setFetchingData(true);
		}
	}, [trainingProgrammeId]);

	return {
		fetchingData,
		trainingProgramme,
		error,
	};
};
