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
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const TrainingProgrammePage = () => {
	const router = useRouter();
	const [trainingProgrammeId, settrainingProgrammeId] = useState<
		string | undefined
	>(undefined);
	const { fetchingData, trainingProgramme, error } =
		useTrainingProgramme(trainingProgrammeId);
	const [trainingProgrammeSkills, setTrainingProgrammeSkills] = useState<
		SkillProgressRecord[] | undefined
	>(undefined);
	const [skillsFilter, setSkillsFilter] = useState("all");

	useEffect(() => {
		if (router.isReady) {
			settrainingProgrammeId(router.query["trainingProgrammeId"]);
			setTrainingProgrammeSkills(trainingProgramme?.skillProgressRecords);
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

	const handleSkillsFilterChange = (event) => {
		setSkillsFilter(event.target.value);

		event.target.value === "all"
			? setTrainingProgrammeSkills(trainingProgramme?.skillProgressRecords)
			: setTrainingProgrammeSkills(
					trainingProgramme?.skillProgressRecords.filter(
						(skillProgressRecord) =>
							skillProgressRecord.progressCode.string === event.target.value
					)
			  );
	};

	const mapSkillProgressRecords = () => {
		const skillProgessRecords =
			skillsFilter === "all"
				? trainingProgramme?.skillProgressRecords
				: trainingProgramme?.skillProgressRecords.filter(
						(spr) => spr.progressCode.string === skillsFilter
				  );

		return skillProgessRecords?.map((skillProgessRecord, i) => {
			return (
				<Paper key={skillProgessRecord.id}>
					<Box
						py={1}
						px={2}
						mb={3}
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<div>
							<Typography fontWeight={600}>
								{skillProgessRecord.skill.name}
							</Typography>
							<Typography mt={1}>
								{skillProgessRecord.progressCode.string}
							</Typography>
						</div>
						<KeyboardArrowRightIcon fontSize="large" />
					</Box>
				</Paper>
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
						onChange={handleSkillsFilterChange}
					>
						<MenuItem value="all">Show All</MenuItem>
						{mapProgressCodeToOptions()}
					</Select>
				</FormControl>
			</Box>
			<hr style={{ margin: "16px 0" }} />
			<Box>
				{trainingProgramme && mapSkillProgressRecords()}
				{trainingProgrammeSkills && trainingProgrammeSkills.length === 0 && (
					<Typography>
						<em>No skills marked as "{skillsFilter}"</em>
					</Typography>
				)}
			</Box>
			<Box mt={4}>
				<Typography variant="h5" color="gray">
					Training Log
				</Typography>
			</Box>
			<hr style={{ margin: "16px 0" }} />
		</>
	);
};

export default TrainingProgrammePage;
