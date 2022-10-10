import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useTrainingProgramme } from "../../../../utils/hooks/trainingProgrammes";
import { ProgressCode, SkillProgressRecord } from "../../../../utils/types";

import {
	Breadcrumbs,
	Link,
	Typography,
	Box,
	Alert,
	Paper,
	FormControl,
	Select,
	MenuItem,
} from "@mui/material";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import TrainingProgrammeLog from "../../../../components/pages/equines/TrainingProgrammeLog";
import TrainingProgrammeSkills from "../../../../components/pages/equines/TrainingProgrammeSkills";

const TrainingProgrammePage = () => {
	const router = useRouter();
	const [trainingProgrammeId, settrainingProgrammeId] = useState<
		string | undefined
	>(undefined);
	const { fetchingData, trainingProgramme, error } =
		useTrainingProgramme(trainingProgrammeId);

	useEffect(() => {
		if (router.isReady) {
			settrainingProgrammeId(router.query["trainingProgrammeId"]);
		}
	}, [router.isReady]);


	if (error) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Alert severity="error">
					An unexpected error occurred. Please refresh the page.
				</Alert>
			</Box>
		);
	}

	if (fetchingData) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<LoadingSpinner />
			</Box>
		);
	}

	return (
		<>
			<Breadcrumbs>
				<Link
					underline="hover"
					color="inherit"
					sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
					onClick={() => router.back()}
				>
					<ArrowLeftIcon /> Back
				</Link>
			</Breadcrumbs>
			<TrainingProgrammeSkills
				skillProgressRecords={trainingProgramme?.skillProgressRecords}
			/>
			<TrainingProgrammeLog
				skillTrainingSessions={trainingProgramme?.skillTrainingSessions}
			/>
		</>
	);
};

export default TrainingProgrammePage;
