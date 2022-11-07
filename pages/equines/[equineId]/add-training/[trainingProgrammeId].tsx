import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { useNewSkillTrainingSession } from "../../../../utils/reducers/trainingSessionReducer";

import NewTrainingSessionDate from "../../../../components/pages/equines/new-training-session/NewTrainingSessionDate";
import { useRouter } from "next/router";
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
const NewTrainingSessionSuccess = dynamic(
	() =>
		import(
			"../../../../components/pages/equines/new-training-session/NewTrainingSessionSuccess"
		)
);

const AddTrainingSessionPage = () => {
	const router = useRouter();
	const {
		state: { formStage },
	} = useNewSkillTrainingSession();
	const [trainingProgrammeId, setTrainingProgrammeId] = useState<
		string | undefined
	>(undefined);

	useEffect(() => {
		if (router.isReady) {
			setTrainingProgrammeId(router.query["trainingProgrammeId"] as string);
		}
	}, [router.isReady]);

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
				return (
					<NewTrainingSessionSummary
						trainingProgrammeId={trainingProgrammeId || ""}
					/>
				);
			case "succdess":
				return <NewTrainingSessionSuccess />;
		}
	};

	return <>{renderForm(formStage)}</>;
};

export default AddTrainingSessionPage;
