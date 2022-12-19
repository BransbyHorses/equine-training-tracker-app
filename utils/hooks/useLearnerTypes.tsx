import { useState, useEffect } from "react";
import axios from "axios";
import { LearnerType } from "../types";

const useLearnerTypes = (): {
	fetchingData: boolean;
	learnerTypes: LearnerType[];
	error: boolean;
} => {
	const [learnerTypes, setLearnerTypes] = useState<LearnerType[]>([]);
	const [fetchingData, setFetchingData] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setFetchingData(true);
		axios
			.get(`${process.env.NEXT_PUBLIC_URL}/data/learner-types`)
			.then(({ data }) => {
				setError(false);
				setFetchingData(false);
				setLearnerTypes(data);
			})
			.catch((err) => {
				setFetchingData(false);
				console.error(
					`Failed to fetch learner types data. Failed with error message: ${err}.`
				);
				setError(true);
			});
	}, []);

	return {
		fetchingData,
		learnerTypes,
		error,
	};
};

export default useLearnerTypes;
