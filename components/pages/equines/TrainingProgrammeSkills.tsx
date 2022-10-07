import React from "react";

import { Skill, SkillProgressRecord } from "../../../utils/types";

import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";

const TrainingProgrammeSkills = (SkillProgressRecords: SkillProgressRecord[]) => {

    

	return SkillProgressRecords.map((skillProgessRecord, i) => {
		return (
			<Paper>
				<Box>
					<Typography fontWeight={600}>
						{skillProgessRecord.Skill.name}
					</Typography>
					<Typography>{skillProgessRecord.progressCode.string}</Typography>
				</Box>
			</Paper>
		);
	});
};

export default TrainingProgrammeSkills;
