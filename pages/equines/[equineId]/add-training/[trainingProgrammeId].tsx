import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { NewTrainingSessionProvider } from "../../../../utils/reducers/trainingSessionReducer";

import { useRouter } from "next/router";
import { useTrainingProgramme } from "../../../../utils/hooks/useTrainingProgramme";
import NewTrainingSessionSwitch from "../../../../components/pages/equines/new-training-session/NewTrainingSessionSwitch";
import { Box } from "@mui/material";
import LoadingSpinner from "../../../../components/LoadingSpinner";

const AddTrainingSessionPage = () => {
	const router = useRouter();
	const [trainingProgrammeId, setTrainingProgrammeId] = useState<string>();
	const { trainingProgramme, fetchingData } = useTrainingProgramme(
		router.isReady,
		trainingProgrammeId
	);

	useEffect(() => {
		if (router.isReady) {
			setTrainingProgrammeId(router.query["trainingProgrammeId"] as string);
		}
	}, [router.isReady]);

	if (fetchingData) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<LoadingSpinner />
			</Box>
		);
	}

	return (
		<NewTrainingSessionProvider>
			<NewTrainingSessionSwitch
				trainingProgramme={trainingProgramme || undefined}
			/>
		</NewTrainingSessionProvider>
	);
};

export default AddTrainingSessionPage;
