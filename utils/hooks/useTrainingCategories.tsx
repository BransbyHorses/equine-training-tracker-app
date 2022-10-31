import { useState, useEffect } from "react";
import axios from "axios";
import { TrainingCategory } from "../types";

const useTrainingCategories = (): {
	fetchingData: boolean;
	trainingCategories: TrainingCategory[];
	error: boolean;
} => {
	const [trainingCategories, setTrainingCategories] = useState<
		TrainingCategory[]
	>([]);
	const [fetchingData, setFetchingData] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setFetchingData(true);
		axios
			.get(`${process.env.NEXT_PUBLIC_URL}/data/training-categories`)
			.then(({ data }) => {
				setFetchingData(false);
				setTrainingCategories(data);
			})
			.catch((err) => {
				console.error(err);
				setFetchingData(false);
				setError(true);
			});
	}, []);

	return { trainingCategories, fetchingData, error };
};

export default useTrainingCategories;
