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
	Tab,
	Tabs,
	AppBar,
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
	const [tabView, setTabView] = useState(0);

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

	const handleTabChange = () => {
		setTabView(tabView === 0 ? 1 : 0);
	};

	function TabPanel(props) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && <>{children}</>}
			</div>
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

			<Tabs
				value={tabView}
				onChange={handleTabChange}
				variant="fullWidth"
				indicatorColor="secondary"
				textColor="inherit"
				sx={{ borderBottom: 1, borderColor: "divider", marginTop: "16px" }}
			>
				<Tab label={`Skills Record`} value={0}></Tab>
				<Tab label={`Training Log`} value={1}></Tab>
			</Tabs>
			<TabPanel value={tabView} index={0}>
				<TrainingProgrammeSkills
					skillProgressRecords={trainingProgramme?.skillProgressRecords}
					skillTrainingSessions={trainingProgramme?.skillTrainingSessions}
				/>
			</TabPanel>
			<TabPanel value={tabView} index={1}>
				<TrainingProgrammeLog
					skillTrainingSessions={trainingProgramme?.skillTrainingSessions}
				/>
			</TabPanel>
		</>
	);
};

export default TrainingProgrammePage;
