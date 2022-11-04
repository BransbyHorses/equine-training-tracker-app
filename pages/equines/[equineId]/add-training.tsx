import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import NewTrainingSessionDate from "../../../components/pages/equines/NewTrainingSessionDate";
import {
	NewTrainingSessionProvider,
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

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query["equineId"] as string);
		}
	}, [router.isReady]);

	return (
		<NewTrainingSessionProvider>
			<NewTrainingSessionDate />
		</NewTrainingSessionProvider>
	);
};

export default AddTrainingSessionPage;
