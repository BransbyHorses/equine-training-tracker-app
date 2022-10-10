import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useTrainingProgrammes } from "../../../../utils/hooks/trainingProgrammes";

import {
	Breadcrumbs,
	Link,
	Box,
	Alert,
	Typography,
	Paper,
} from "@mui/material";
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
				<>
					<Paper>
						<Box mt={3} p={2}>
							<Typography variant="h6" mb={2} color="gray">
								Active Training Programme
							</Typography>
							<hr style={{ margin: "16px 0" }} />
							<TrainingProgrammesTable
								trainingProgrammes={trainingProgrammes.filter(
									(t) => !t.endDate
								)}
								data="active"
							/>
						</Box>
					</Paper>
					<Paper>
						<Box mt={3} p={2}>
							<Typography variant="h6" mb={2} color="gray">
								Completed Training Programmes (
								{trainingProgrammes.filter((t) => t.endDate).length})
							</Typography>
							<hr style={{ margin: "16px 0" }} />
							<TrainingProgrammesTable
								trainingProgrammes={trainingProgrammes.filter((t) => t.endDate)}
								data="inactive"
							/>
						</Box>
					</Paper>
				</>
			)}
		</>
	);
};

export default EquineTrainingProgrammes;
