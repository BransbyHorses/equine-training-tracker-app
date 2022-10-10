import React, { useState } from "react";

import {
	Box,
	Typography,
	FormControl,
	MenuItem,
	Select,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";
import { SkillTrainingSession } from "../../../utils/types";
import { convertDateToString } from "../../../utils/helpers";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommentIcon from "@mui/icons-material/Comment";

const TrainingProgrammeLog = ({
	skillTrainingSessions,
}: {
	skillTrainingSessions?: SkillTrainingSession[];
}) => {
	const [trainingLogFilter, setTrainingLogFilter] = useState("Most recent");

	return (
		<>
			<Box
				mt={4}
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-end",
				}}
			>
				<Typography variant="h5" color="gray">
					Training Log
				</Typography>
				<FormControl size="small" variant="outlined" sx={{ minWidth: "150px" }}>
					<Select
						id="trainingLogFilter"
						value={trainingLogFilter}
						onChange={(event) => setTrainingLogFilter(event?.target.value)}
					>
						<MenuItem value="Most recent">Most recent</MenuItem>
						<MenuItem value="Oldest">Oldest</MenuItem>
					</Select>
				</FormControl>
			</Box>
			<hr style={{ margin: "16px 0" }} />
			{(!skillTrainingSessions || skillTrainingSessions.length === 0) && (
				<Typography>
					<em>No training log available</em>
				</Typography>
			)}
			{skillTrainingSessions?.map((skillTrainingSession) => {
				return (
					<Box mb={2}>
						<Accordion>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Box
									key={skillTrainingSession.id}
									sx={{ display: "flex", alignItems: "center" }}
								>
									<Typography fontWeight={600}>
										{convertDateToString("2022-10-09")}
									</Typography>
									{skillTrainingSession.notes.length > 0 ? (
										<span style={{ marginLeft: "16px" }}>
											<CommentIcon fontSize="small" />
										</span>
									) : (
										<></>
									)}
								</Box>
							</AccordionSummary>
							<AccordionDetails>
								<Box sx={{ display: "flex", borderBottom: 1 }} pb={1}>
									<Typography fontWeight={600} mr={1}>
										Skill:
									</Typography>
									<Typography>{skillTrainingSession.skill.name}</Typography>
								</Box>
								<Box sx={{ display: "flex", borderBottom: 1 }} pb={1} mt={1}>
									<Typography fontWeight={600} mr={1}>
										Time:
									</Typography>
									<Typography>
										{skillTrainingSession.trainingTime} minutes
									</Typography>
								</Box>
								<Box sx={{ display: "flex", borderBottom: 1 }} pb={1} mt={1}>
									<Typography fontWeight={600} mr={1}>
										Progress Marked:
									</Typography>
									<Typography>
										{skillTrainingSession.progressCode.string}
									</Typography>
								</Box>
								<Box sx={{ display: "flex", borderBottom: 1 }} pb={1} mt={1}>
									<Typography fontWeight={600} mr={1}>
										Training Method:
									</Typography>
									<Typography>
										{skillTrainingSession.trainingMethod.name}
									</Typography>
								</Box>
								<Box sx={{ display: "flex", borderBottom: 1 }} pb={1} mt={1}>
									<Typography fontWeight={600} mr={1}>
										Environment:
									</Typography>
									<Typography>
										{skillTrainingSession.environment.name}
									</Typography>
								</Box>
								{skillTrainingSession.notes.length > 0 ? (
									<Box sx={{ display: "flex", borderBottom: 1 }} pb={1} mt={1}>
										<Typography fontWeight={600} mr={1}>
											Trainer Notes:
										</Typography>
										<Typography>{skillTrainingSession.notes}</Typography>
									</Box>
								) : (
									<></>
								)}
							</AccordionDetails>
						</Accordion>
					</Box>
				);
			})}
		</>
	);
};

export default TrainingProgrammeLog;
