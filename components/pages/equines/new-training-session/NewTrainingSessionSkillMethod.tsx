import React, {useEffect} from "react";
import BackBreadcrumb from "../../../BackBreadcrumb";
import {
	NewSkillTrainingSessionType,
	useNewSkillTrainingSession,
} from "../../../../utils/reducers/trainingSessionReducer";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import useCollection from "../../../../utils/hooks/useCollection";
import {Skill} from "../../../../utils/types";

import PageTitle from "../../../PageTitle";

const NewTrainingSessionSkillMethod = () => {
	const {
		state: { formStage, newTrainingSession },
		dispatch,
	} = useNewSkillTrainingSession();

	const { fetchingData, collection, error } = useCollection("skills");

	useEffect(() => {
		if (!newTrainingSession.skill) {
			dispatch({
				type: NewSkillTrainingSessionType.SET_SKILL,
				payload: "",
			});
		}
	}, []);

	const changeSkill = (e) => {
		console.log("TARGET");
		console.log(e);
		const newSkill : Skill = collection.find(skill => e.target.value = skill.id);
		dispatch({
			type: NewSkillTrainingSessionType.SET_SKILL,
			payload: newSkill,
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
					{collection.map(({ id, name }) => {
						return (
							<MenuItem key={id} value={id}>
								{name}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</>
	);
};

export default NewTrainingSessionSkillMethod;
