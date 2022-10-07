import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useTrainingProgramme } from "../../../../utils/hooks/trainingProgrammes";
import { ProgressCode } from "../../../../utils/types";

import {
	Breadcrumbs,
	Link,
	Typography,
	Box,
	Alert,
	Paper,
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import TrainingProgrammeSkills from "../../../../components/pages/equines/TrainingProgrammeSkills";

const TrainingProgrammePage = () => {
	const router = useRouter();
	const [trainingProgrammeId, settrainingProgrammeId] = useState<
		string | undefined
	>(undefined);
	const { fetchingData, trainingProgramme, error } =
		useTrainingProgramme(trainingProgrammeId);
	const [skillsFilter, setSkillsFilter] = useState("all");

	useEffect(() => {
		if (router.isReady) {
			settrainingProgrammeId(router.query["trainingProgrammeId"]);
		}
	}, [router.isReady]);

	const mapProgressCodeToOptions = () => {
		return Object.keys(ProgressCode)
			.filter((v) => isNaN(Number(v)))
			.map((progressCode, i) => {
				return (
					<MenuItem key={i} value={progressCode}>
						{progressCode}
					</MenuItem>
				);
			});
	};

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
			<Box
				mt={4}
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-end",
				}}
			>
				<Typography variant="h5" color="gray">
					Skills
				</Typography>
				<FormControl size="small" variant="outlined" sx={{ minWidth: "150px" }}>
					<Select
						id="progressCode"
						value={skillsFilter}
						onChange={(e) => setSkillsFilter(e.target.value)}
					>
						<MenuItem value="all">Show All</MenuItem>
						{mapProgressCodeToOptions()}
					</Select>
				</FormControl>
			</Box>
			<hr style={{ margin: "16px 0" }} />
			<Box>
			</Box>
		</>
	);
};

export default TrainingProgrammePage;
