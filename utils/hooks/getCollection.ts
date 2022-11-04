import { useState, useEffect } from "react";
import axios from "axios";

export default function getCollection(endpoint : string) {

	const [collection, setCollection] = useState([]);
	const [fetchingData, setFetchingData] = useState(false);
	const [error, setError] = useState(false);

	fetch(`${process.env.NEXT_PUBLIC_URL}data/${endpoint}`)
		.then((response) => response.json())
		.then((data) => setCollection(data))
		.catch((rejected) => {
			console.log(rejected);
		});

	return {
		fetchingData,
		collection,
		error,
	};
};
