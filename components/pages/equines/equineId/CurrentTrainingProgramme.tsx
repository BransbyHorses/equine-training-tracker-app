import React from "react";
import { findCurrentTrainingProgramme } from "../../../../utils/helpers";
import { TrainingProgramme } from "../../../../utils/types";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const CurrentTrainingProgramme = ({
	trainingProgrammes,
}: {
	trainingProgrammes?: TrainingProgramme[];
}) => {
	const currentTrainingProgramme =
		findCurrentTrainingProgramme(trainingProgrammes);

	if (!currentTrainingProgramme)
		return <MoreHorizIcon sx={{ color: "gray" }} />;

	return <span>{currentTrainingProgramme.trainingCategory.name}</span>;
};

export default React.memo(CurrentTrainingProgramme);
