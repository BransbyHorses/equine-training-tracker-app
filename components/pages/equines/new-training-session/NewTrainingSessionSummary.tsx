import React, { useEffect, useState } from "react";
import {
	NewSkillTrainingSessionType,
	useNewSkillTrainingSession,
} from "../../../../utils/reducers/trainingSessionReducer";
import BackBreadcrumb from "../../../BackBreadcrumb";
import PageTitle from "../../../PageTitle";
import { Box, Typography } from "@mui/material";
import { convertDateToString } from "../../../../utils/helpers";
import Link from "next/link";
import ResponsiveButton from "../../../ResponsiveButton";

const NewTrainingSessionSummary = () => {
	const {
		state: { newTrainingSession },
		dispatch,
	} = useNewSkillTrainingSession();
	const [disableSubmit, setDisableSubmit] = useState(false);

	useState(() => {
		Object.values(newTrainingSession).every((v) => {
			if (!v) {
				setDisableSubmit(true);
				return false;
			}
		});
	});

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
					onClick={props.handleChangeClick}
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
			<Box sx={{ mb: 2, maxWidth: "500px" }}>
				<SummaryRow
					title="Date"
					value={convertDateToString(newTrainingSession.date?.toISOString())}
					handleChangeClick={() =>
						dispatch({
							type: NewSkillTrainingSessionType.GO_TO,
							payload: "date",
						})
					}
				/>
				<SummaryRow title="Skill" value={newTrainingSession.skill?.name} />
				<SummaryRow
					title="Training Method"
					value={newTrainingSession.trainingMethod?.name}
					handleChangeClick={() =>
						dispatch({
							type: NewSkillTrainingSessionType.GO_TO,
							payload: "skillMethod",
						})
					}
				/>
				<SummaryRow
					title="Environment"
					value={newTrainingSession.environment?.name}
					handleChangeClick={() =>
						dispatch({
							type: NewSkillTrainingSessionType.GO_TO,
							payload: "skillMethod",
						})
					}
				/>
				<SummaryRow
					title="Skill Level"
					value={newTrainingSession.progressCode}
					handleChangeClick={() =>
						dispatch({
							type: NewSkillTrainingSessionType.GO_TO,
							payload: "progress",
						})
					}
				/>
				<SummaryRow title="Comments" value={newTrainingSession.notes} />
			</Box>
			<ResponsiveButton disabled={disableSubmit}>Submit</ResponsiveButton>
		</>
	);
};

export default NewTrainingSessionSummary;
