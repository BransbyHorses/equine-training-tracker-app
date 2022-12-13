import React, { useEffect, useState } from "react";
import BackBreadcrumb from "../../../BackBreadcrumb";
import ResponsiveButton from "../../../ResponsiveButton";
import {
	NewSkillTrainingSessionType,
	useNewSkillTrainingSession,
} from "../../../../utils/reducers/trainingSessionReducer";
import NewTrainingSessionSelect from "./NewTrainingSessionSelect";
import useCollection from "../../../../utils/hooks/useCollection";
import Box from "@mui/material/Box";

import PageTitle from "../../../PageTitle";

const NewTrainingSessionSkillMethod = () => {
	const {
		state: { newTrainingSession },
		dispatch,
	} = useNewSkillTrainingSession();

	const [skillId, setSkillId] = useState<string | number>("");
	const [trainingMethodId, setTrainingMethodId] = useState<string | number>("");

	const { collection: skills } = useCollection("skills");
	const { collection: trainingMethods } = useCollection("training-methods");

	useEffect(() => {
		setSkillId(newTrainingSession.skill ? newTrainingSession.skill.id : "");
		setTrainingMethodId(
			newTrainingSession.trainingMethod
				? newTrainingSession.trainingMethod?.id
				: ""
		);
	}, [newTrainingSession.skill, newTrainingSession.trainingMethod]);

	const changeSkill = (e: any) => {
		setSkillId(e.target.value);
		const newSkill = skills.find((skill) => e.target.value == skill.id);
		dispatch({
			type: NewSkillTrainingSessionType.SET_SKILL,
			payload: newSkill,
		});
	};

	const changeTrainingMethod = (e: any) => {
		setTrainingMethodId(e.target.value);
		const newTrainingMethod = trainingMethods.find(
			(method) => e.target.value == method.id
		);
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
				value={skillId}
				label="Select a Skill"
				handleChange={changeSkill}
				categories={skills}
			/>

			<Box sx={{ m: 10 }} />

			<PageTitle title="What training method did you use?" />

			<NewTrainingSessionSelect
				id="method-selection"
				value={trainingMethodId}
				label="Selct a Training Method"
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
