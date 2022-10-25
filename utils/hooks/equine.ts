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
			.get(`${process.env.NEXT_PUBLIC_URL}data/equines`)
			.then(({ data }) => {
				setError(false);
				setFetchingData(false);
				setEquines(data);
			})
			.catch((err) => {
				console.error(
					`Failed to fetch equines data. Failed with error message: ${err}.`
				);
				setError(true);
				setFetchingData(false);
			});
	}, []);

	return {
		fetchingData,
		equines,
		error,
	};
};

export const useEquine = (
	routerReady: boolean,
	id?: string
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
		if (routerReady) {
			setFetchingData(true);
			axios
				.get(`${process.env.NEXT_PUBLIC_URL}data/equines/${id}`)
				.then(({ data }) => {
					setFetchingData(false);
					setError(false);
					setEquine(data);
				})
				.catch((err) => {
					setFetchingData(false);
					setError(true);
					const { status } = err.response;
					if (status === 404) {
						setNotFound(true);
					}
					console.error(
						`Failed to fetch equine data. Failed with error message: ${err}.`
					);
				});
		} else {
			setFetchingData(true);
		}
	}, [routerReady, id]);

	return {
		fetchingData,
		equine,
		error,
		notFound,
	};
};
