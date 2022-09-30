import { useState, useEffect } from "react";
import axios from "axios";
import { Yard } from "../types";

const useYards = (): {
	fetchingData: boolean;
	yards: Yard[];
	error: boolean;
} => {
	const [yards, setYards] = useState<Yard[]>([]);
	const [fetchingData, setFetchingData] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setFetchingData(true);
		axios
			.get(`${process.env.NEXT_PUBLIC_URL}/data/yards`)
			.then(({ data }) => {
				console.log(data)
				setYards(data);
			})
			.catch((err) => {
				setError(true);
			})
			.finally(() => setFetchingData(false));
	}, []);

	return {
		fetchingData,
		yards,
		error,
	};
};

export default useYards;
