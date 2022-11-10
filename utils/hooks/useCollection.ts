import { useState, useEffect } from "react";
import axios from "axios";

const useCollection = (
	endpoint?: string,
): {
	fetchingData: boolean;
	collection: any[] | [];
	error: boolean;
} => {
	const [collection, setCollection] = useState([]);
	const [fetchingData, setFetchingData] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setFetchingData(true);
		if (endpoint) {
			axios
				.get(`${process.env.NEXT_PUBLIC_URL}data/${endpoint}`)
				.then(({ data }) => {
					console.log(data);
					setCollection(data);
					setFetchingData(false);
				})
				.catch((err) => {
					console.error(
						`Failed to fetch collection. Failed with error message: ${err}.`
					);
					setFetchingData(false);
					setError(true);
				});
		}
	}, [endpoint]);

	return {
		collection,
		fetchingData,
		error,
	};
};

export default useCollection;
