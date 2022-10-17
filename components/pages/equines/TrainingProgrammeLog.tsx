import React, { useState, useEffect } from "react";

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

	const mapTrainingSessions = () => {
		return skillTrainingSessions
			?.sort((a, b) => {
				if (new Date(a.date) > new Date(b.date)) {
					return trainingLogFilter === "Most recent" ? -1 : 1;
				} else {
					return trainingLogFilter === "Most recent" ? 1 : -1;
				}
			})
			.map((skillTrainingSession) => {
				return (
					<>
						<Box sx={{ borderBottom: "1px solid gray" }}>
							<Accordion elevation={0} sx={{ backgroundColor: "transparent" }}>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									sx={{ padding: 0 }}
								>
									<Box
										key={skillTrainingSession.id}
										sx={{ display: "flex", alignItems: "center" }}
									>
										<Typography fontWeight={600}>
											{convertDateToString(skillTrainingSession.date)}
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
									<Box
										sx={{ display: "flex", borderBottom: "0.5px solid gray" }}
										pb={1}
									>
										<Typography fontWeight={600} mr={1}>
											Skill:
										</Typography>
										<Typography>{skillTrainingSession.skill.name}</Typography>
									</Box>
									<Box
										sx={{ display: "flex", borderBottom: "0.5px solid gray" }}
										pb={1}
										mt={1}
									>
										<Typography fontWeight={600} mr={1}>
											Time:
										</Typography>
										<Typography>
											{skillTrainingSession.trainingTime} minutes
										</Typography>
									</Box>
									<Box
										sx={{ display: "flex", borderBottom: "0.5px solid gray" }}
										pb={1}
										mt={1}
									>
										<Typography fontWeight={600} mr={1}>
											Progress Marked:
										</Typography>
										<Typography>
											{skillTrainingSession.progressCode.string}
										</Typography>
									</Box>
									<Box
										sx={{ display: "flex", borderBottom: "0.5px solid gray" }}
										pb={1}
										mt={1}
									>
										<Typography fontWeight={600} mr={1}>
											Method Used:
										</Typography>
										<Typography>
											{skillTrainingSession.trainingMethod.name}
										</Typography>
									</Box>
									<Box
										sx={{ display: "flex", borderBottom: "0.5px solid gray" }}
										pb={1}
										mt={1}
									>
										<Typography fontWeight={600} mr={1}>
											Environment:
										</Typography>
										<Typography>
											{skillTrainingSession.environment.name}
										</Typography>
									</Box>
									<Box sx={{ display: "flex" }} pb={1} mt={1}>
										<Typography fontWeight={600} mr={1}>
											Trainer Notes:
										</Typography>
										<Typography>
											{" "}
											{skillTrainingSession.notes.length > 0 ? (
												<span>{skillTrainingSession.notes}</span>
											) : (
												<em>No trainer notes provided</em>
											)}
										</Typography>
									</Box>
								</AccordionDetails>
							</Accordion>
						</Box>
					</>
				);
			});
	};

	if (!skillTrainingSessions || skillTrainingSessions.length === 0) {
		return <></>;
	}

	return (
		<>
			<Box
				mt={4}
				sx={{
					display: "flex",
				}}
			>
				<FormControl
					size="small"
					variant="outlined"
					sx={{ minWidth: "150px", marginLeft: "auto" }}
				>
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
			<hr style={{ margin: "16px 0 0 0" }} />
			{mapTrainingSessions()}
		</>
	);
};

export default TrainingProgrammeLog;
