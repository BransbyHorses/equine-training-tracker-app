import React, {useEffect, useState} from 'react';
import {
	NewSkillTrainingSessionType,
	useNewSkillTrainingSession,
} from "../../../../utils/reducers/trainingSessionReducer";
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

	const [environmentId, setEnvironmentId] = useState<number>(0);


	useEffect(() => {
		setEnvironmentId(newTrainingSession.environment?.id ? newTrainingSession.environment?.id : 0);
	})

    const changeEnvironment = (e:any) => {
		setEnvironmentId(e.target.value);
		const newEnvironment = environments.find(environment => e.target.value == environment.id) 
		console.log(newEnvironment)
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
					 newTrainingSessionCategory={environmentId}
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