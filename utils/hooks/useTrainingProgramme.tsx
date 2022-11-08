import { useState, useEffect } from "react";
import axios from "axios";
import { TrainingProgramme } from "../types";

export const useTrainingProgramme = (
	routerReady: boolean,
	trainingProgrammeId?: string
): {
	fetchingData: boolean;
	trainingProgramme: TrainingProgramme | undefined;
	error: boolean;
} => {
	const [trainingProgramme, setTrainingProgramme] = useState(undefined);
	const [fetchingData, setFetchingData] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (routerReady && trainingProgrammeId) {
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
