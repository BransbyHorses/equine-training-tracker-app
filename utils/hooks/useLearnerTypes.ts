import { useState, useEffect } from "react";
import axios from "axios";

import { LearnerType } from "../types";

export const useLearnerTypes = (): {
	fetchingData: boolean;
	learnerTypes: LearnerType[];
	error: boolean;
} => {
	const [learnerTypes, setLearnerTypes] = useState([]);
	const [fetchingData, setFetchingData] = useState(false);
	const [error, setError] = useState(false);
	const [notFound, setNotFound] = useState(false);


	useEffect(() => {
		setFetchingData(true);
		axios
			.get(`${process.env.NEXT_PUBLIC_URL}/data/learner-types`)
			.then(({ data }) => {
				setLearnerTypes(data);
			})
			.catch((err) => {
				console.error(
					`Failed to fetch learner types data. Failed with error message: ${err}.`
				);
				setError(true);
			})
			.finally(() => setFetchingData(false));
	}, []);

	return {
		fetchingData,
		learnerTypes,
		error,
	};
};
