import { useState, useEffect } from "react";
import axios from "axios";
import { TrainingProgramme } from "../types";

const useTrainingProgrammes = (equineId: {
	equineId: number;
}): {
	fetchingData: boolean;
	trainingProgrammes: TrainingProgramme[] | [];
	error: boolean;
} => {
	const [trainingProgrammes, setTrainingProgrammes] = useState([]);
	const [fetchingData, setFetchingData] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setFetchingData(true);
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
				setError(true);
			});
	}, []);

	return {
		trainingProgrammes,
		fetchingData,
		error,
	};
};

export default useTrainingProgrammes;
