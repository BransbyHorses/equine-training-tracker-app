import React from "react";
import BackBreadcrumb from "../../../BackBreadcrumb";
import {
	NewSkillTrainingSessionType,
	useNewSkillTrainingSession,
} from "../../../../utils/reducers/trainingSessionReducer";
import { Box } from "@mui/material";
import PageTitle from "../../../PageTitle";

const NewTrainingSessionSkillMethod = () => {
	const {
		state: { formStage },
		dispatch,
	} = useNewSkillTrainingSession();

	return (
		<>
			<BackBreadcrumb
                onClick={() => dispatch({ type: NewSkillTrainingSessionType.BACK })}
            />
            <PageTitle title="What skill did you train?" />
		</>
	);
};

export default NewTrainingSessionSkillMethod;
