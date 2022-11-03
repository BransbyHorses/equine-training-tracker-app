import React from "react";
import { findCurrentTrainingProgramme } from "../../../utils/helpers";
import { TrainingProgramme } from "../../../utils/types";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Typography } from "@mui/material";

const CurrentTrainingProgramme = ({
	trainingProgrammes,
}: {
	trainingProgrammes?: TrainingProgramme[];
}) => {
	const currentTrainingProgramme =
		findCurrentTrainingProgramme(trainingProgrammes);

	if (!currentTrainingProgramme)
		return (
			<Typography color="gray">
				<small>
					<em>No Training Programme</em>
				</small>
			</Typography>
		);

	return (
		<Typography>{currentTrainingProgramme.trainingCategory.name}</Typography>
	);
};

export default CurrentTrainingProgramme;
