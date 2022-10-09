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
				console.log(skillTrainingSession);
				return (
					<Accordion>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Box key={skillTrainingSession.id}>
								<Typography fontWeight={600}>
									{convertDateToString(skillTrainingSession.date)}
								</Typography>
								<Typography>{skillTrainingSession.skill.name}</Typography>
							</Box>
						</AccordionSummary>
						<AccordionDetails></AccordionDetails>
					</Accordion>
				);
			})}
		</>
	);
};

export default TrainingProgrammeLog;
