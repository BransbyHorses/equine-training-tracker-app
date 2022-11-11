import React, {useEffect, useState} from "react";
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

	const [skillId, setSkillId] = useState<number>(0);
	const [trainingMethodId, setTrainingMethodId] = useState<number>(0);


	useEffect(() => {
		setSkillId(newTrainingSession.skill?.id ? newTrainingSession.skill?.id : 0 );
		setTrainingMethodId(newTrainingSession.trainingMethod?.id ? newTrainingSession.trainingMethod?.id  : 0);
	})


	const changeSkill = (e:any) => {
		setSkillId(e.target.value)
		var newSkill = skills.find(skill => e.target.value == skill.id);
		console.log(newSkill);
		dispatch({
			type: NewSkillTrainingSessionType.SET_SKILL,
			payload: newSkill,
		});
	};

	const changeTrainingMethod = (e:any) => {
		setTrainingMethodId(e.target.value);
		var newTrainingMethod = trainingMethods.find(method => e.target.value == method.id);
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
				newTrainingSessionCategory={skillId}
				label="Skill"
				handleChange={changeSkill}
				categories={skills}
			/>
			<Box sx={{ m: 10 }} />

			<PageTitle title="What method did you use?" />

			<NewTrainingSessionSelect
				id="method-selection"
				newTrainingSessionCategory={trainingMethodId}
				label="Training method"
				handleChange={changeTrainingMethod}
				categories={trainingMethods}
			/>

			<ResponsiveButton
				disabled={
					!newTrainingSession.skill || !newTrainingSession.trainingMethod
				}
				onClick={() => dispatch({ type: NewSkillTrainingSessionType.NEXT })}
				desktopstyles={{ width: "20%", mt: 3 }}
			>
				Continue
			</ResponsiveButton>
		</>
	);
};

export default NewTrainingSessionSkillMethod;
