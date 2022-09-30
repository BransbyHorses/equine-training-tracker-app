import { useState, useEffect } from "react";
import axios from "axios";

import { Equine } from "../types";

const useEquines = (): {
	fetchingData: boolean;
	equines: Equine[];
	error: boolean;
} => {
	const [equines, setEquines] = useState([]);
	const [fetchingData, setFetchingData] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setFetchingData(true);
		axios
			.get(`${process.env.NEXT_PUBLIC_URL}/data/equines`)
			.then(({ data }) => {
				setEquines(data);
			})
			.catch((err) => {
				setError(true);
			})
			.finally(() => setFetchingData(false));
	}, []);

	return {
		fetchingData,
		equines,
		error,
	};
};

export default useEquines;
