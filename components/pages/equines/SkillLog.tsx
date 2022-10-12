import { Box, Typography } from "@mui/material";
import React from "react";
import { convertDateToString } from "../../../utils/helpers";
import {
	SkillProgressRecord,
	ProgressCode,
	SkillTrainingSession,
} from "../../../utils/types";
import TrainingProgrammeLog from "./TrainingProgrammeLog";

const progressTagPalette = {
	"Not able": "#f6d7d2",
	"Just started": "#d2e2f1",
	"Ok with limits": "#1d70b8",
	Confident: "#005a30",
};

const SkillLog = ({
	skillTrainingSessions,
	skillProgressRecord,
}: {
	skillTrainingSessions: SkillTrainingSession[];
	skillProgressRecord: SkillProgressRecord;
}) => {
	return (
		<>
			<Typography variant="h4">{skillProgressRecord.skill.name}</Typography>
			<Typography variant="h6" display="inline" fontWeight={400}>
				Current level:&nbsp;
			</Typography>
			<Typography variant="h6" display="inline" fontWeight={400}>
				{skillProgressRecord.progressCode.string}
			</Typography>
			<Typography color="gray">
				{skillTrainingSessions.length === 0 ? (
					<small>No training sessions</small>
				) : (
					<small>
						Last trained on&nbsp;
						{convertDateToString(
							skillTrainingSessions.sort((a, b) => {
								new Date(b.date) - new Date(a.date);
							})[0].date
						)}
					</small>
				)}
			</Typography>
			<TrainingProgrammeLog skillTrainingSessions={skillTrainingSessions} />
		</>
	);
};

export default SkillLog;
