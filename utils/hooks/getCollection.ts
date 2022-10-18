import { useState, useEffect } from "react";
import axios from "axios";

export default function getCollection(endpoint : string) {

	const [collection, setCollection] = useState([]);
	const [fetchingData, setFetchingData] = useState(false);
	const [error, setError] = useState(false);
	const [notFound, setNotFound] = useState(false);


	useEffect(() => {
		setFetchingData(true);
		axios
			.get(`${process.env.NEXT_PUBLIC_URL}/data/${endpoint}`)
			.then(({ data }) => {
				setCollection(data);
			})
			.catch((err) => {
				console.error(
					`Failed to fetch ${endpoint} data. Failed with error message: ${err}.`
				);
				setError(true);
			})
			.finally(() => setFetchingData(false));
	}, []);

	return {
		fetchingData,
		collection,
		error,
	};
};
