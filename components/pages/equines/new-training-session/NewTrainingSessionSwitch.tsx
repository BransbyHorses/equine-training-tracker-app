import React, { useEffect } from "react";
import dynamic from "next/dynamic";

import {
	NewSkillTrainingSessionType,
	useNewSkillTrainingSession,
} from "../../../../utils/reducers/trainingSessionReducer";

import NewTrainingSessionDate from "../../../../components/pages/equines/new-training-session/NewTrainingSessionDate";
import { TrainingProgramme } from "../../../../utils/types";
const NewTrainingSessionSkillMethod = dynamic(
	() =>
		import(
			"../../../../components/pages/equines/new-training-session/NewTrainingSessionSkillMethod"
		)
);
const NewTrainingSessionEnvironment = dynamic(
	() =>
		import(
			"../../../../components/pages/equines/new-training-session/NewTrainingSessionEnvironment"
		)
);
const NewTrainingSessionProgress = dynamic(
	() =>
		import(
			"../../../../components/pages/equines/new-training-session/NewTrainingSessionProgress"
		)
);
const NewTrainingSessionSummary = dynamic(
	() =>
		import(
			"../../../../components/pages/equines/new-training-session/NewTrainingSessionSummary"
		)
);

const NewTrainingSessionSwitch = ({
	trainingProgramme,
}: {
	trainingProgramme?: TrainingProgramme;
}) => {
	const {
		dispatch,
		state: { formStage },
	} = useNewSkillTrainingSession();

	useEffect(() => {
		if (trainingProgramme) {
			dispatch({
				type: NewSkillTrainingSessionType.SET_TRAINING_PROGRAMME,
				payload: trainingProgramme,
			});
		}
	}, [trainingProgramme, dispatch]);

	const renderForm = (formStage: string) => {
		switch (formStage) {
			case "date":
				return <NewTrainingSessionDate />;
			case "skillMethod":
				return <NewTrainingSessionSkillMethod />;
			case "environment":
				return <NewTrainingSessionEnvironment />;
			case "progress":
				return <NewTrainingSessionProgress />;
			case "summary":
				return <NewTrainingSessionSummary />;
			default:
				throw new Error(
					"Invalid formStage argument passed to renderForm function"
				);
		}
	};
	return <>{trainingProgramme && renderForm(formStage)}</>;
};

export default NewTrainingSessionSwitch;
