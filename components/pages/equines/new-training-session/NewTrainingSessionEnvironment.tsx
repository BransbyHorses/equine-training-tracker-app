import React from 'react';
import {
	NewSkillTrainingSessionType,
	useNewSkillTrainingSession,
} from "../../../../utils/reducers/trainingSessionReducer";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import {TrainingEnvironment} from "../../../../utils/types";
import ResponsiveButton from "../../../ResponsiveButton";
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
            <FormControl fullWidth>
				<InputLabel id="environment-selection">Environment</InputLabel>
				<Select
					value={newTrainingSession.environment || ""}
					name={newTrainingSession.environment?.name}
					label="Environment"
					onChange={changeEnvironment}
				>
					{environments.map(environment => {
						return (
							<MenuItem key={environment.id} value={environment}>
								{environment.name}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
            <ResponsiveButton
				disabled={!newTrainingSession.environment}
				onClick={() => dispatch({ type: NewSkillTrainingSessionType.NEXT })}
			>
				Continue
			</ResponsiveButton>
        </>
    );
};

export default NewTrainingSessionEnvironment;