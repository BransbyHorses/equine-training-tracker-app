import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import {
	newTrainingSessionState,
	skillTrainingSessionReducer,
} from "../../../utils/reducers/trainingSessionReducer";

const AddTrainingSessionPage = () => {
	const router = useRouter();

	const [newTrainingSession, dispatch] = useReducer(
		skillTrainingSessionReducer,
		newTrainingSessionState
	);
	const [equineId, setEquineId] = useState<string | undefined>(undefined);

	console.log(newTrainingSession);

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query["equineId"] as string);
		}
	}, [router.isReady]);

	return <BackBreadcrumb link={`/equines/${equineId}`} />;
};

export default AddTrainingSessionPage;
