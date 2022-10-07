import React from "react";
import { useRouter } from "next/router";

import useTrainingProgrammes from "../../../../utils/hooks/useTrainingProgrammes";

import { Breadcrumbs, Link, Box, Alert } from "@mui/material";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const EquineTrainingProgrammes = () => {
	const router = useRouter();
	const { fetchingData, trainingProgrammes, error } = useTrainingProgrammes(1);

	const trainingProgrammes = [];

	if (fetchingData) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<LoadingSpinner />
			</Box>
		);
	}

	if (error) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Alert severity="error">
					An unexpected error occurred. Please refresh the page.
				</Alert>
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
			{trainingProgrammes.length === 0 && (
				<Box
					mt={3}
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Alert severity="info">No Training Programmes available</Alert>
				</Box>
			)}
		</>
	);
};

export default EquineTrainingProgrammes;
