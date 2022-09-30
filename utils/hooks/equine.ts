import { useState, useEffect } from "react";
import axios from "axios";

import { Equine } from "../types";

export const useEquines = (): {
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

export const useEquine = (
	id: number
): {
	fetchingData: boolean;
	equine: Equine | undefined;
	error: boolean;
	notFound: boolean;
} => {
	const [equine, setEquine] = useState(undefined);
	const [fetchingData, setFetchingData] = useState(false);
	const [error, setError] = useState(false);
	const [notFound, setNotFound] = useState(false);

	useEffect(() => {
		setFetchingData(true);
		axios
			.get(`${process.env.NEXT_PUBLIC_URL}/data/equines/${id}`)
			.then(({ data }) => {
				setEquine(data);
				setFetchingData(false);
			})
			.catch((err) => {
				setFetchingData(false);
				const { status } = err.response;
				setError(true);
				if (status === 404) {
					setNotFound(true);
				}
			});
	}, []);

	return {
		fetchingData,
		equine,
		error,
		notFound,
	};
};
