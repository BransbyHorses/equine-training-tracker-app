import React, { useState } from "react";
import {
	NewTrainingSessionContext,
	NewSkillTrainingSessionType,
} from "../../../../utils/reducers/trainingSessionReducer";

import ResponsiveButton from "../../../ResponsiveButton";
import BackBreadcrumb from "../../../BackBreadcrumb";
import PageTitle from "../../../PageTitle";

const NewTrainingSessionDate = () => {
	const {
		state: { newTrainingSession },
		dispatch,
	} = React.useContext(NewTrainingSessionContext);
	const [date, setDate] = useState(newTrainingSession.date || "");

	return (
		<>
			<BackBreadcrumb />
			<PageTitle title="What date was your training session?" />
			<ResponsiveButton
				disabled={date}
				onClick={() => dispatch({ type: NewSkillTrainingSessionType.NEXT })}
			>
				Continue
			</ResponsiveButton>
		</>
	);
};

export default NewTrainingSessionDate;
