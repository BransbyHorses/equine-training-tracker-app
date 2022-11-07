import React, { useState, useEffect } from "react";
import {
	NewSkillTrainingSessionType,
	useNewSkillTrainingSession,
} from "../../../../utils/reducers/trainingSessionReducer";
import BackBreadcrumb from "../../../BackBreadcrumb";
import PageTitle from "../../../PageTitle";
import { Box, Typography } from "@mui/material";
import { convertDateToString } from "../../../../utils/helpers";
import ResponsiveButton from "../../../ResponsiveButton";
import axios from "axios";
import { TrainingProgramme } from "../../../../utils/types";

const NewTrainingSessionSummary = ({
	trainingProgramme,
}: {
	trainingProgramme?: TrainingProgramme;
}) => {
	const {
		state: { newTrainingSession },
		dispatch,
	} = useNewSkillTrainingSession();
	const [disableSubmit, setDisableSubmit] = useState(false);

	useEffect(() => {
		for (const [_, v] of Object.entries(newTrainingSession)) {
			if (!v) {
				setDisableSubmit(true);
				break;
			}
		}
	}, []);

	const convertDayJsDateToString = (date: any) => {
		return `${date.$y}-${date.$M + 1}-${date.$D} ${date.$H}:${date.$m}:${
			date.$s
		}`;
	};

	const submitNewTrainingSession = async () => {
		axios
			.post(
				`${process.env.NEXT_PUBLIC_URL}data/training-programmes/${
					trainingProgramme!.id
				}/skill-training-session`,
				{
					...newTrainingSession,
					date: convertDayJsDateToString(newTrainingSession.date),
				}
			)
			.then(({ data }) => {
				dispatch({ type: NewSkillTrainingSessionType.NEXT });
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const SummaryRow = (props: any) => {
		return (
			<Box
				sx={{
					py: 2,
					px: 1,
					borderBottom: "1px solid lightGray",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Box>
					<Typography fontWeight={700}>{props.title}</Typography>
					<Typography fontWeight={300}>{props.value}</Typography>
				</Box>
				<Typography
					color={!props.value ? "red" : "#42a5f5"}
					sx={{ cursor: "pointer" }}
					onClick={() =>
						dispatch({
							type: NewSkillTrainingSessionType.GO_TO,
							payload: props.goTo,
						})
					}
				>
					<small>{!props.value ? "Add" : "Change"}</small>
				</Typography>
			</Box>
		);
	};

	return (
		<>
			<BackBreadcrumb />
			<PageTitle title="Check details" />
			<Box sx={{ mb: 1, pl: 2, py: 0.5, borderLeft: "5px solid lightGray" }}>
				<Typography color="gray" fontWeight={600}>
					{trainingProgramme?.equine.name}
				</Typography>
				<Typography color="gray">
					{trainingProgramme?.trainingCategory.name}
				</Typography>
			</Box>
			<Box sx={{ mb: 2, maxWidth: "500px" }}>
				<SummaryRow
					title="Date"
					value={convertDateToString(newTrainingSession.date?.toISOString())}
					goTo="date"
				/>
				<SummaryRow title="Skill" value={newTrainingSession.skill?.name} />
				<SummaryRow
					title="Training Method"
					value={newTrainingSession.trainingMethod?.name}
					goTo="skillMethod"
				/>
				<SummaryRow
					title="Environment"
					value={newTrainingSession.environment?.name}
					goTo="skillMethod"
				/>
				<SummaryRow
					title="Skill Level"
					value={newTrainingSession.progressCode}
					goTo="progress"
				/>
				<SummaryRow title="Comments" value={newTrainingSession.notes} />
			</Box>
			<ResponsiveButton
				disabled={disableSubmit}
				onClick={submitNewTrainingSession}
			>
				Submit
			</ResponsiveButton>
		</>
	);
};

export default NewTrainingSessionSummary;
