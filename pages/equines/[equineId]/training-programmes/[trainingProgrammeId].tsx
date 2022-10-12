import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTrainingProgramme } from "../../../../utils/hooks/trainingProgrammes";

import TrainingProgrammeLog from "../../../../components/pages/equines/TrainingProgrammeLog";
import TrainingProgrammeSkills from "../../../../components/pages/equines/TrainingProgrammeSkills";
import SkillLog from "../../../../components/pages/equines/SkillLog";

import {
	Breadcrumbs,
	Link,
	Box,
	Alert,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { convertDateToString } from "../../../../utils/helpers";

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

	useEffect(() => {
		if (router.isReady) {
			settrainingProgrammeId(router.query["trainingProgrammeId"]);
		}
	}, [router.isReady]);

	useEffect(() => {
		if (router.query["skill"]) {
			setSkillFocus(router.query["skill"]);
		} else {
			setSkillFocus(0);
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
			<Box pb={2} mt={3} sx={{ borderBottom: "0.55px solid gray" }}>
				<Typography variant="h5" color="gray">
					{trainingProgramme?.equine.name}
				</Typography>
				<Typography>
					<small>
						{trainingProgramme?.trainingCategory.name} |&nbsp;
						{trainingProgramme?.endDate
							? `Ended on ${convertDateToString(trainingProgramme.endDate)}`
							: "In Progress"}
					</small>
				</Typography>
			</Box>
			{skillFocus > 0 ? (
				<SkillLog
					skillProgressRecord={
						trainingProgramme?.skillProgressRecords.filter(
							(skillProgressRecord) =>
								skillProgressRecord.skill.id == skillFocus
						)[0]
					}
					skillTrainingSessions={trainingProgramme?.skillTrainingSessions.filter(
						(skillTrainingSession) =>
							skillTrainingSession.skill.id == skillFocus
					)}
				/>
			) : (
				<>
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
			)}
		</>
	);
};

export default TrainingProgrammePage;
