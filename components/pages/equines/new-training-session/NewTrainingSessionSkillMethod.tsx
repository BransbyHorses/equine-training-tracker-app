import React, {useEffect} from "react";
import BackBreadcrumb from "../../../BackBreadcrumb";
import ResponsiveButton from "../../../ResponsiveButton";
import {
	NewSkillTrainingSessionType,
	useNewSkillTrainingSession,
} from "../../../../utils/reducers/trainingSessionReducer";
import { Box } from "@mui/material";
import NewTrainingSessionSelect from "./NewTrainingSessionSelect";
import useCollection from "../../../../utils/hooks/useCollection";
import {Skill, TrainingMethod} from "../../../../utils/types";

import PageTitle from "../../../PageTitle";

const NewTrainingSessionSkillMethod = () => {
	const {
		state: { formStage, newTrainingSession },
		dispatch,
	} = useNewSkillTrainingSession();

	const { 
		fetchingData: fetchingSkillsData, 
		collection: skills, 
		error: skillError 
	} = useCollection("skills");

	const { 
		fetchingData: fetchingTrainingMethodData, 
		collection: trainingMethods, 
		error: trainingMethodError 
	} = useCollection("training-methods");

	


	const changeSkill = (e:any) => {
		const newSkill = e.target.value;
		dispatch({
			type: NewSkillTrainingSessionType.SET_SKILL,
			payload: newSkill,
		});
	};

	const changeTrainingMethod = (e:any) => {
		const newTrainingMethod = e.target.value;
		dispatch({
			type: NewSkillTrainingSessionType.SET_TRAINING_METHOD,
			payload: newTrainingMethod,
		});
	};

	return (
		<>
			<BackBreadcrumb
                onClick={() => dispatch({ type: NewSkillTrainingSessionType.BACK })}
            />
            <PageTitle title="What skill did you train?" />

			<NewTrainingSessionSelect 
				id="skill-selection"
				newTrainingSessionCategory={newTrainingSession.skill}
				label="Skill"
				handleChange={changeSkill}
				categories={skills}
				/>
			<Box sx={{ m: 15 }} />

			<PageTitle title="What method did you use?" />

			<NewTrainingSessionSelect 
				id="method-selection"
				newTrainingSessionCategory={newTrainingSession.trainingMethod}
				label="Training method"
				handleChange={changeTrainingMethod}
				categories={trainingMethods}
				/>

			<ResponsiveButton
				disabled={!newTrainingSession.skill || !newTrainingSession.trainingMethod}
				onClick={() => dispatch({ type: NewSkillTrainingSessionType.NEXT })}
			>
				Continue
			</ResponsiveButton>
		</>
	);
};

export default NewTrainingSessionSkillMethod;
