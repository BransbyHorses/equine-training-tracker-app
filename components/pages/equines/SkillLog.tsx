import { Box, Typography } from "@mui/material";
import React from "react";
import {
	SkillProgressRecord,
	SkillTrainingSession,
} from "../../../utils/types";

const SkillLog = ({
	skillTrainingSessions,
	skillProgressRecord,
}: {
	skillTrainingSessions: SkillTrainingSession[];
	skillProgressRecord: SkillProgressRecord;
}) => {
	return (
		<>
			<Box mt={4}>
				<Typography variant="h4">{skillProgressRecord.skill.name}</Typography>
				<Typography variant="h6">
					Current level: {skillProgressRecord.progressCode.string}
				</Typography>
			</Box>
		</>
	);
};

export default SkillLog;
