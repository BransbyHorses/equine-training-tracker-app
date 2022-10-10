import React, { useState, useEffect } from "react";
import {
	SkillTrainingSession,
} from "../../../utils/types";
import { Typography } from "@mui/material";
import { convertDateToString } from "../../../utils/helpers";

const SkillsTimeLine = ({
	skillTrainingSessions,
}: {
	skillTrainingSessions?: SkillTrainingSession[];
}) => {
	const lastTrainingSession: string = skillTrainingSessions.sort((a, b) => {
		new Date(b.date) - new Date(a.date);
	})[0].date;

	return (
		<>
			<Typography color="gray">
				Last updated on&nbsp;
				{convertDateToString(lastTrainingSession)}
			</Typography>
		</>
	);
};

export default SkillsTimeLine;
