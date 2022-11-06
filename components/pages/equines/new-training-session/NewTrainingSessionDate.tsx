import React, { useEffect } from "react";
import {
	NewTrainingSessionContext,
	NewSkillTrainingSessionType,
} from "../../../../utils/reducers/trainingSessionReducer";

import ResponsiveButton from "../../../ResponsiveButton";
import BackBreadcrumb from "../../../BackBreadcrumb";
import PageTitle from "../../../PageTitle";

import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";

import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

const NewTrainingSessionDate = () => {
	const {
		state: { newTrainingSession },
		dispatch,
	} = React.useContext(NewTrainingSessionContext);

	useEffect(() => {
		dispatch({
			type: NewSkillTrainingSessionType.SET_DATE,
			payload: dayjs(),
		});
	}, []);

	const changeDate = (newDate: Dayjs | null) => {
		dispatch({
			type: NewSkillTrainingSessionType.SET_DATE,
			payload: newDate,
		});
	};

	return (
		<>
			<BackBreadcrumb />
			<PageTitle title="What date was your training session?" />
			<Box sx={{ my: 4 }}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<MobileDatePicker
						label="Training Date"
						inputFormat="YYYY/MM/DD"
						value={newTrainingSession.date}
						onChange={changeDate}
						renderInput={(params) => <TextField {...params} fullWidth />}
					/>
				</LocalizationProvider>
			</Box>
			<ResponsiveButton
				disabled={!newTrainingSession.date}
				onClick={() => dispatch({ type: NewSkillTrainingSessionType.NEXT })}
			>
				Continue
			</ResponsiveButton>
		</>
	);
};

export default NewTrainingSessionDate;
