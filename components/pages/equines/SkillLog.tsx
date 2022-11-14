import React from "react";
import {
	SkillProgressRecord,
	SkillTrainingSession,
} from "../../../utils/types";

import TrainingProgrammeLog from "./TrainingProgrammeLog";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const SkillLog = ({
	skillTrainingSessions,
	skillProgressRecord,
}: {
	skillTrainingSessions: SkillTrainingSession[];
	skillProgressRecord: SkillProgressRecord;
}) => {
	return (
		<>
			<Box mt={3}>
				<Typography variant="h4" color="primary.light" fontWeight={500}>
					{skillProgressRecord.skill.name}
				</Typography>
				<Typography display="inline" fontWeight={400}>
					Current level: &nbsp;
				</Typography>
				<Typography variant="h6" display="inline" fontWeight={400}>
					{skillProgressRecord.progressCode.string}
				</Typography>
			</Box>
			<TrainingProgrammeLog skillTrainingSessions={skillTrainingSessions} />
		</>
	);
};

export default SkillLog;
