import { useState, useEffect } from "react";
import axios from "axios";

import { TrainingCategory } from "../types";

export const useTrainingCategories = (): {
	fetchingData: boolean;
	trainingCategories: TrainingCategory[];
	error: boolean;
} => {
	const [trainingCategories, setTrainingCategories] = useState([]);
	const [fetchingData, setFetchingData] = useState(false);
	const [error, setError] = useState(false);
	const [notFound, setNotFound] = useState(false);


	useEffect(() => {
		setFetchingData(true);
		axios
			.get(`${process.env.NEXT_PUBLIC_URL}/data/training-categories`)
			.then(({ data }) => {
				setTrainingCategories(data);
				console.log(trainingCategories);
			})
			.catch((err) => {
				console.error(
					`Failed to fetch equines data. Failed with error message: ${err}.`
				);
				setError(true);
			})
			.finally(() => setFetchingData(false));
	}, []);

	return {
		fetchingData,
		trainingCategories,
		error,
	};
};
