import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useTrainingProgramme } from "../../../../utils/hooks/trainingProgrammes";
import { ProgressCode, SkillProgressRecord } from "../../../../utils/types";

import { Breadcrumbs, Link, Box, Alert, Tab, Tabs } from "@mui/material";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import TrainingProgrammeLog from "../../../../components/pages/equines/TrainingProgrammeLog";
import TrainingProgrammeSkills from "../../../../components/pages/equines/TrainingProgrammeSkills";

function TabPanel(props: any) {
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

const TrainingProgrammePage = () => {
	const router = useRouter();
	const [trainingProgrammeId, settrainingProgrammeId] = useState<
		string | undefined
	>(undefined);
	const { fetchingData, trainingProgramme, error } =
		useTrainingProgramme(trainingProgrammeId);
	const [tabView, setTabView] = useState(0);
	const [skillFocus, setSkillFocus] = useState<number>(0);

	console.log(skillFocus);

	useEffect(() => {
		if (router.isReady) {
			settrainingProgrammeId(router.query["trainingProgrammeId"]);
		}
	}, [router.isReady]);

	useEffect(() => {
		if (router.query["skill"]) {
			setSkillFocus(router.query["skill"]);
		}
	}, [router]);

	const directToSkillLog = (id: number) => {
		router.push(
			`/equines/${trainingProgramme?.equine.id}/training-programmes/${trainingProgramme?.id}?skill=${id}`,
			undefined,
			{ shallow: true }
		);
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

			<Tabs
				value={tabView}
				onChange={() => setTabView(tabView === 0 ? 1 : 0)}
				variant="fullWidth"
				indicatorColor="secondary"
				textColor="inherit"
				sx={{ borderBottom: 1, borderColor: "divider", marginTop: "16px" }}
			>
				<Tab label={`Skills Record`} value={0}></Tab>
				<Tab
					label={`Training Log (${trainingProgramme?.skillTrainingSessions.length})`}
					value={1}
				></Tab>
			</Tabs>
			<TabPanel value={tabView} index={0}>
				<TrainingProgrammeSkills
					skillProgressRecords={trainingProgramme?.skillProgressRecords!}
					skillTrainingSessions={trainingProgramme?.skillTrainingSessions!}
					setSkillsFocus={directToSkillLog}
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
