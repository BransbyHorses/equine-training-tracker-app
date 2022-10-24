import { useState, useEffect } from "react";
import axios from "axios";
import { Yard } from "../types";

const useYards = (): {
	fetchingYardData: boolean;
	yards: Yard[];
	error: boolean;
} => {
	const [yards, setYards] = useState<Yard[]>([]);
	const [fetchingYardData, setFetchingYardData] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setFetchingYardData(true);
		axios
			.get(`${process.env.NEXT_PUBLIC_URL}data/yards`)
			.then(({ data }) => {
				setYards(data);
			})
			.catch((err) => {
				console.error(
					`Failed to fetch yards data. Failed with error message: ${err}.`
				);
				setError(true);
			})
			.finally(() => setFetchingYardData(false));
	}, []);

	return {
		fetchingYardData,
		yards,
		error,
	};
};

export default useYards;
