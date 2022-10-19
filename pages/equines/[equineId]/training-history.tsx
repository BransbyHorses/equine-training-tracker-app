import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTrainingProgramme } from "../../../utils/hooks/trainingProgrammes";

import TrainingProgrammeLog from "../../../components/pages/equines/TrainingProgrammeLog";
import TrainingProgrammeSkills from "../../../components/pages/equines/TrainingProgrammeSkills";
import SkillLog from "../../../components/pages/equines/SkillLog";

import {
	Breadcrumbs,
	Link,
	Box,
	Alert,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";
import LoadingSpinner from "../../../components/LoadingSpinner";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { convertDateToString } from "../../../utils/helpers";
import useTrainingHistoryPage from "../../../utils/hooks/useTrainingHistoryPage";

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

const TrainingHistoryPage = () => {
	const router = useRouter();
	const [equineId, setEquineId] = useState<string | undefined>(undefined);
	const { fetchingData, trainingHistory, error } =
		useTrainingHistoryPage(equineId);
	const [tabView, setTabView] = useState(0);
	const [skillFocus, setSkillFocus] = useState<number>(0);

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query["equineId"] as string);
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
			`/equines/${equineId}/training-history?skill=${id}`,
			undefined,
			{ shallow: true }
		);
	};

	const trainingHistoryCount =
		!trainingHistory.skillTrainingSessions ||
		trainingHistory.skillTrainingSessions.length === 0
			? "0"
			: `${trainingHistory.skillTrainingSessions.length}`;

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
			{skillFocus > 0 ? (
				<SkillLog
					skillProgressRecord={
						trainingHistory.trainingProgramme!.skillProgressRecords.filter(
							(skillProgressRecord) =>
								skillProgressRecord.skill.id == skillFocus
						)[0]
					}
					skillTrainingSessions={trainingHistory.skillTrainingSessions.filter(
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
						<Tab label={`Skills`} value={0}></Tab>
						<Tab
							label={`Training History (${trainingHistoryCount})`}
							value={1}
						></Tab>
					</Tabs>
					<TabPanel value={tabView} index={0}>
						{!trainingHistory.trainingProgramme ? (
							<Box mt={2}>
								<Typography>
									<em>No skills record available</em>
								</Typography>
							</Box>
						) : (
							<TrainingProgrammeSkills
								skillProgressRecords={
									trainingHistory.trainingProgramme.skillProgressRecords
								}
								skillTrainingSessions={trainingHistory.skillTrainingSessions}
								setSkillsFocus={directToSkillLog}
							/>
						)}
					</TabPanel>
					<TabPanel value={tabView} index={1}>
						{trainingHistory!.skillTrainingSessions.length === 0 ? (
							<Box mt={2}>
								<Typography>
									<em>No training history available</em>
								</Typography>
							</Box>
						) : (
							<TrainingProgrammeLog
								skillTrainingSessions={trainingHistory.skillTrainingSessions}
							/>
						)}
					</TabPanel>
				</>
			)}
		</>
	);
};

export default TrainingHistoryPage;
