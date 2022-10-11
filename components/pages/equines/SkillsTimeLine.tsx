import React, { useState, useEffect } from "react";
import { SkillTrainingSession } from "../../../utils/types";
import { Typography } from "@mui/material";
import { convertDateToString } from "../../../utils/helpers";

const SkillsTimeLine = ({
	skillTrainingSessions,
}: {
	skillTrainingSessions?: SkillTrainingSession[];
}) => {
	return (
		<>
			<Typography color="gray">
				Last updated on&nbsp;
				{convertDateToString(
					skillTrainingSessions.sort((a, b) => {
						new Date(b.date) - new Date(a.date);
					})[0].date
				)}
			</Typography>
		</>
	);
};

export default SkillsTimeLine;
