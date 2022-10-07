import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import useTrainingProgrammes from "../../../../utils/hooks/useTrainingProgrammes";

import { Breadcrumbs, Link, Box, Alert, Typography } from "@mui/material";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import TrainingProgrammesTable from "../../../../components/pages/equines/TrainingProgrammesTable";

const EquineTrainingProgrammes = () => {
	const router = useRouter();
	const [equineId, setEquineId] = useState<string | undefined>(undefined);
	const { fetchingData, trainingProgrammes, error } =
		useTrainingProgrammes(equineId);

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query["equineId"]);
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
			{trainingProgrammes.length === 0 ? (
				<Box
					mt={3}
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Alert severity="info">No Training History Available</Alert>
				</Box>
			) : (
				<Box mt={3}>
					<Typography variant="h6" mb={2} color="gray">
						Active Training Programmes
					</Typography>
					<TrainingProgrammesTable
						trainingProgrammes={trainingProgrammes.filter((t) => !t.endDate)}
						data="active"
					/>
					<Typography variant="h6" mb={2} mt={5} color="gray">
						Completed Training Programmes
					</Typography>
					<TrainingProgrammesTable
						trainingProgrammes={trainingProgrammes.filter((t) => t.endDate)}
						data="inactive"
					/>
				</Box>
			)}
		</>
	);
};

export default EquineTrainingProgrammes;
