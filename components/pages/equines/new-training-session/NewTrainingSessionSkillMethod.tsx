import React, {useEffect} from "react";
import BackBreadcrumb from "../../../BackBreadcrumb";
import ResponsiveButton from "../../../ResponsiveButton";
import {
	NewSkillTrainingSessionType,
	useNewSkillTrainingSession,
} from "../../../../utils/reducers/trainingSessionReducer";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
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

	// useEffect(() => {
	// 	if (!newTrainingSession.skill) {
	// 		dispatch({
	// 			type: NewSkillTrainingSessionType.SET_SKILL,
	// 			payload: "",
	// 		});
	// 	}
	// }, []);

	const changeSkill = (e:any) => {
		const newSkill : Skill = skills.find(skill => e.target.value = skill.id);
		dispatch({
			type: NewSkillTrainingSessionType.SET_SKILL,
			payload: newSkill,
		});
	};

	const changeTrainingMethod = (e:any) => {
		const newTrainingMethod : TrainingMethod = trainingMethods.find(method => e.target.value = method.id);
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

			<FormControl fullWidth>
				<InputLabel id="skill-selection">Skill</InputLabel>
				<Select
					value={newTrainingSession.skill?.id || ""}
					name={newTrainingSession.skill?.name}
					label="Skill"
					onChange={changeSkill}
				>
					{skills.map(({ id, name }) => {
						return (
							<MenuItem key={id} value={id}>
								{name}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>

			<Box sx={{ m: 20 }} />

			<PageTitle title="What method did you use?" />

			<FormControl fullWidth>
				<InputLabel id="method-selection">Training Method</InputLabel>
				<Select
					value={newTrainingSession.trainingMethod?.id || ""}
					name={newTrainingSession.trainingMethod?.name}
					label="Training Method"
					onChange={changeTrainingMethod}
				>
					{trainingMethods.map(({ id, name }) => {
						return (
							<MenuItem key={id} value={id}>
								{name}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>

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
