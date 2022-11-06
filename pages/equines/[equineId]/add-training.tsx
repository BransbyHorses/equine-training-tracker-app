import React from "react";
import dynamic from "next/dynamic";

import { useNewSkillTrainingSession } from "../../../utils/reducers/trainingSessionReducer";

import NewTrainingSessionDate from "../../../components/pages/equines/new-training-session/NewTrainingSessionDate";
const NewTrainingSessionSkillMethod = dynamic(
	() =>
		import(
			"../../../components/pages/equines/new-training-session/NewTrainingSessionSkillMethod"
		)
);
const NewTrainingSessionEnvironment = dynamic(
	() =>
		import(
			"../../../components/pages/equines/new-training-session/NewTrainingSessionEnvironment"
		)
);
const NewTrainingSessionProgress = dynamic(
	() =>
		import(
			"../../../components/pages/equines/new-training-session/NewTrainingSessionProgress"
		)
);
const NewTrainingSessionSummary = dynamic(
	() =>
		import(
			"../../../components/pages/equines/new-training-session/NewTrainingSessionSummary"
		)
);
const NewTrainingSessionSuccess = dynamic(
	() =>
		import(
			"../../../components/pages/equines/new-training-session/NewTrainingSessionSuccess"
		)
);

const AddTrainingSessionPage = () => {	
	const {
		state: { formStage },
	} = useNewSkillTrainingSession();

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
			case "succdess":
				return <NewTrainingSessionSuccess />;
		}
	};

	return <>{renderForm(formStage)}</>;
};

export default AddTrainingSessionPage;
