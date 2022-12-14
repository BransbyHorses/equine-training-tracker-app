import React, { useEffect, useState } from "react";
import {
	NewSkillTrainingSessionType,
	useNewSkillTrainingSession,
} from "../../../../utils/reducers/trainingSessionReducer";
import {
	Box,
	FormControl,
	FormControlLabel,
	RadioGroup,
	Radio,
	TextField,
} from "@mui/material";
import ResponsiveButton from "../../../ResponsiveButton";
import useCollection from "../../../../utils/hooks/useCollection";

import PageTitle from "../../../PageTitle";
import BackBreadcrumb from "../../../BackBreadcrumb";

const NewTrainingSessionProgress = () => {
	const {
		state: { newTrainingSession },
		dispatch,
	} = useNewSkillTrainingSession();
	const { collection: progressCodes } = useCollection("progress-codes");
	const [formValues, setFormValues] = useState({
		progress: "",
		notes: "New Note",
	});
	const COMMENT_CHAR_LIMIT = 255;

	useEffect(() => {
		setFormValues({
			progress: newTrainingSession.progressCode
				? newTrainingSession.progressCode
				: "",
			notes: newTrainingSession.notes,
		});
	}, [newTrainingSession.notes, newTrainingSession.progressCode]);

	const changeProgressCode = (e: any) => {
		setFormValues({ ...formValues, progress: e.target.value });
	};

	const updateComments = (e: any) => {
		setFormValues({ ...formValues, notes: e.target.value });
	};

	const saveAndContiue = () => {
		dispatch({
			type: NewSkillTrainingSessionType.SET_PROGRESS_CODE,
			payload: formValues.progress,
		});
		dispatch({
			type: NewSkillTrainingSessionType.SET_NOTES,
			payload: formValues.notes,
		});
		dispatch({ type: NewSkillTrainingSessionType.NEXT });
	};

	return (
		<>
			<BackBreadcrumb
				onClick={() => dispatch({ type: NewSkillTrainingSessionType.BACK })}
			/>
			<PageTitle title="Skill level" />
			<FormControl>
				<RadioGroup
					value={formValues.progress}
					name="skill-level-radio-group"
					onChange={changeProgressCode}
				>
					{progressCodes.map(({ string }) => {
						return (
							<FormControlLabel
								key={string}
								value={string}
								control={<Radio />}
								label={string}
							/>
						);
					})}
				</RadioGroup>
			</FormControl>
			<Box sx={{ m: 3 }} />
			<PageTitle title="Add comments (optional)" />
			<Box mt={2}>
				<TextField
					fullWidth
					variant="outlined"
					value={formValues.notes}
					multiline
					rows={6}
					placeholder="Notes (maximum 255 characters)"
					inputProps={{ maxLength: COMMENT_CHAR_LIMIT }}
					onChange={updateComments}
				/>
			</Box>
			<ResponsiveButton
				disabled={!formValues.progress}
				onClick={saveAndContiue}
				desktopstyles={{ width: "20%", mt: 3 }}
			>
				Continue
			</ResponsiveButton>
		</>
	);
};

export default NewTrainingSessionProgress;
