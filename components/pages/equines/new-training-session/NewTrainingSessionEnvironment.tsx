import React from 'react';
import {
	NewSkillTrainingSessionType,
	useNewSkillTrainingSession,
} from "../../../../utils/reducers/trainingSessionReducer";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {TrainingEnvironment} from "../../../../utils/types";
import ResponsiveButton from "../../../ResponsiveButton";
import NewTrainingSessionSelect from './NewTrainingSessionSelect';
import useCollection from "../../../../utils/hooks/useCollection";


import PageTitle from "../../../PageTitle";
import BackBreadcrumb from '../../../BackBreadcrumb';

const NewTrainingSessionEnvironment = () => {

    const {
		state: { formStage, newTrainingSession },
		dispatch,
	} = useNewSkillTrainingSession();

    const { 
		fetchingData: fetchingEnvironmentsData, 
		collection: environments, 
		error: environmentsError 
	} = useCollection("environments");

    const changeEnvironment = (e:any) => {
		const newEnvironment = e.target.value;
		dispatch({
			type: NewSkillTrainingSessionType.SET_ENVIRONMENT,
			payload: newEnvironment,
		});
	};

    return (
			<>
				<BackBreadcrumb
					onClick={() => dispatch({ type: NewSkillTrainingSessionType.BACK })}
				/>
				<PageTitle title="Where did you do this training?" />
				<NewTrainingSessionSelect
					id="environment-selection"
					newTrainingSessionCategory={newTrainingSession.environment}
					label="Environment"
					handleChange={changeEnvironment}
					categories={environments}
				/>
				<ResponsiveButton
					disabled={!newTrainingSession.environment}
					onClick={() => dispatch({ type: NewSkillTrainingSessionType.NEXT })}
					desktopstyles={{ width: "20%", mt: 3 }}
				>
					Continue
				</ResponsiveButton>
			</>
		);
};

export default NewTrainingSessionEnvironment;