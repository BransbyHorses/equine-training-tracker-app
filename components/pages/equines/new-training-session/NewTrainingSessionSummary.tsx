import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
	NewSkillTrainingSessionType,
	useNewSkillTrainingSession,
} from "../../../../utils/reducers/trainingSessionReducer";
import PageTitle from "../../../PageTitle";
import { Box, Typography } from "@mui/material";
import { convertDateToString } from "../../../../utils/helpers";
import ResponsiveButton from "../../../ResponsiveButton";
import axios from "axios";

const NewTrainingSessionSuccessModal = dynamic(
	() => import("../new-training-session/NewTrainingSessionSuccessModal")
);

export const convertDayJsDateToString = (date: any) => {
	const year = date.$y;
	const month = date.$M + 1;
	const day = `${date.$D.toString().length === 1 ? "0" : ""}${date.$D}`;
	const hour = date.$H;
	const minutes = date.$m;
	const seconds = `${date.$s.toString().length === 1 ? "0" : ""}${date.$s}`;

	return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
};

const NewTrainingSessionSummary = () => {
	const {
		state: { newTrainingSession, trainingProgramme },
		dispatch,
	} = useNewSkillTrainingSession();
	const [submitState, setSubmitState] = useState({
		disabled: false,
		submitting: false,
		success: false,
		error: false,
	});

	useEffect(() => {
		for (const [k, v] of Object.entries(newTrainingSession)) {
			if (k === "notes") continue;
			if (!v) {
				setSubmitState({ ...submitState, disabled: true });
				break;
			}
		}
	}, []);

	const submitNewTrainingSession = async () => {
		setSubmitState({ ...submitState, submitting: true });
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
				setSubmitState({ ...submitState, submitting: false, success: true });
			})
			.catch((err) => {
				console.error(err);
				setSubmitState({ ...submitState, submitting: false, error: true });
			});
	};

	const SummaryRow = ({ title, value, notRequired, goTo }: any) => {
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
					<Typography fontWeight={700}>{title}</Typography>
					<Typography fontWeight={300}>{value}</Typography>
				</Box>
				<Typography
					color={!value && !notRequired ? "red" : "#42a5f5"}
					sx={{ cursor: "pointer" }}
					onClick={() =>
						dispatch({
							type: NewSkillTrainingSessionType.GO_TO,
							payload: goTo,
						})
					}
				>
					<small>{!value ? "Add" : "Change"}</small>
				</Typography>
			</Box>
		);
	};

	return (
		<>
			<NewTrainingSessionSuccessModal
				isSubmitting={submitState.submitting}
				success={submitState.success}
			/>
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
				<SummaryRow
					title="Skill"
					value={newTrainingSession.skill?.name}
					goTo="skillMethod"
				/>
				<SummaryRow
					title="Training Method"
					value={newTrainingSession.trainingMethod?.name}
					goTo="skillMethod"
				/>
				<SummaryRow
					title="Environment"
					value={newTrainingSession.environment?.name}
					goTo="environment"
				/>
				<SummaryRow
					title="Skill Level"
					value={newTrainingSession.progressCode}
					goTo="progress"
				/>
				<SummaryRow
					title="Comments"
					value={newTrainingSession.notes}
					notRequired
				/>
				<ResponsiveButton
					// disabled={submitState.disabled}
					onClick={submitNewTrainingSession}
					desktopstyles={{ width: "100%", mt: 3 }}
				>
					Submit
				</ResponsiveButton>
			</Box>
		</>
	);
};

export default NewTrainingSessionSummary;
