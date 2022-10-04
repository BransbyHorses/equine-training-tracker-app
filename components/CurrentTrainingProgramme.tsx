import React from "react";
import { findLatestTrainingProgramme } from "../utils/helpers";
import { TrainingProgramme } from "../utils/types";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const CurrentTrainingProgramme = ({
	trainingProgrammes,
}: {
	trainingProgrammes: TrainingProgramme[];
}) => {
	const currentTrainingProgramme =
		findLatestTrainingProgramme(trainingProgrammes);

	if (!currentTrainingProgramme)
		return <MoreHorizIcon sx={{ color: "gray" }} />;

	return <span>{currentTrainingProgramme.trainingCategory.name}</span>;
};

export const MemoizedCurrentTrainingProgramme = React.memo(
	CurrentTrainingProgramme
);
