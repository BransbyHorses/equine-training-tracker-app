import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import useTrainingProgrammes from "../../../../utils/hooks/useTrainingProgrammes";

import { Breadcrumbs, Link, Box, Alert } from "@mui/material";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const EquineTrainingProgrammes = () => {
	const router = useRouter();
	const [equineId, setEquineId] = useState<string | undefined>(undefined);
	const { fetchingData, trainingProgrammes, error } = useTrainingProgrammes(
		equineId
	);

	useEffect(() => {
		console.log(router.query.equineId);
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
			{trainingProgrammes.length === 0 && (
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
			)}
		</>
	);
};

export default EquineTrainingProgrammes;
