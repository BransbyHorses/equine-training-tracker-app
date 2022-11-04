import React from "react";
import {
	NewTrainingSessionContext,
	NewSkillTrainingSessionType,
} from "../../../utils/reducers/trainingSessionReducer";
import BackBreadcrumb from "../../BackBreadcrumb";
import ResponsiveButton from "../../ResponsiveButton";

const NewTrainingSessionDate = () => {
	const { state, dispatch } = React.useContext(NewTrainingSessionContext);

	console.log(state);

	return (
		<>
			<BackBreadcrumb />
			<ResponsiveButton
				onClick={() => dispatch({ type: NewSkillTrainingSessionType.NEXT, payload:  })}
			>
				Continue
			</ResponsiveButton>
		</>
	);
};

export default NewTrainingSessionDate;
