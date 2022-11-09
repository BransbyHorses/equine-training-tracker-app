import React, {useState} from 'react';
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
    Typography
    } from "@mui/material";
import {TrainingEnvironment} from "../../../../utils/types";
import ResponsiveButton from "../../../ResponsiveButton";
import useCollection from "../../../../utils/hooks/useCollection";


import PageTitle from "../../../PageTitle";
import BackBreadcrumb from '../../../BackBreadcrumb';

const NewTrainingSessionProgress = () => {

    const COMMENT_CHAR_LIMIT = 255;

    const [formCharacterCount, setFormCharacterCount] = useState<number>(0);

    const {
		state: { formStage, newTrainingSession },
		dispatch,
	} = useNewSkillTrainingSession();

    const { 
		fetchingData: fetchingProgressCodesData, 
		collection: progressCodes, 
		error: progressCodesError 
	} = useCollection("progress-codes");

    const changeProgressCode = (e:any) => {
		const newProgressCode = e.target.value;
		dispatch({
			type: NewSkillTrainingSessionType.SET_PROGRESS_CODE,
			payload: newProgressCode,
		});
	};

    const updateComments = (e:any) => {
        setFormCharacterCount(e.target.value.length);
        const newNotes = e.target.value;
		dispatch({
			type: NewSkillTrainingSessionType.SET_NOTES,
			payload: newNotes,
		});
    }

    return (
       <>
       <BackBreadcrumb
                onClick={() => dispatch({ type: NewSkillTrainingSessionType.BACK })}
            />
        <PageTitle title="Skill level" />

        <FormControl>
        <RadioGroup
            defaultValue="radioform"
            name="radio-buttons-group"
            onChange={changeProgressCode}
           >
            {progressCodes.map(({string}) => {
            return (
            <FormControlLabel 
                key={string} 
                value={string} 
                control={<Radio/>} 
                label={string}
                 />
                )
            }
            )
        }
        </RadioGroup>
    </FormControl>
    <Box sx={{ m: 2 }} />
    <PageTitle title="Add comments (optional)" />
    <Box mt={2} sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
            sx={{ marginBottom: "16px" }}
            variant="outlined"
         //   value={formContent}
            multiline
            rows={4}
            placeholder="Notes (maximum 255 characters)"
            inputProps={{ maxLength: COMMENT_CHAR_LIMIT }}
            onChange={updateComments}
        />
        </Box>
    {formCharacterCount >= COMMENT_CHAR_LIMIT && 
        <Typography color="error">
            <small>Comment character limit reached</small>
        </Typography>
    }
    <ResponsiveButton
        disabled={!newTrainingSession.progressCode}
        onClick={() => dispatch({ type: NewSkillTrainingSessionType.NEXT })}
    >
		Continue
	</ResponsiveButton>
    </>
    );
};

export default NewTrainingSessionProgress;