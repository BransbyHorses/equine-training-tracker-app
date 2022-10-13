import React from "react";
import { convertDateToString } from "../../../utils/helpers";
import {
	SkillProgressRecord,
	SkillTrainingSession,
} from "../../../utils/types";

import TrainingProgrammeLog from "./TrainingProgrammeLog";

import { Box, Typography } from "@mui/material";

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
