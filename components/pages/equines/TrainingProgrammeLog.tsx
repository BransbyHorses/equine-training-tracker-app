import React, { useState} from "react";

import {
	Box,
	Typography,
	FormControl,
	MenuItem,
	Select,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	useTheme,
	FormControlLabel,
	Checkbox,
	FormGroup,
	Grid,
} from "@mui/material";
import { SkillTrainingSession } from "../../../utils/types";
import { convertDateToString } from "../../../utils/helpers";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommentIcon from "@mui/icons-material/Comment";
import PaginationContainer from "../../PaginationContainer";

const TrainingProgrammeLog = ({
	skillTrainingSessions,
}: {
	skillTrainingSessions: SkillTrainingSession[] | [];
}) => {
	const theme = useTheme();
	const [trainingLogFilter, setTrainingLogFilter] = useState("Most recent");
	const [showNotes, setShowNotes] = useState(false);

	const TrainingSessionDetail = ({
		title,
		content,
		isLast,
	}: {
		title: string;
		content?: string;
		isLast?: boolean;
	}) => {
		return (
			<Box borderBottom={isLast ? "none" : "1px solid lightGray"} py={1}>
				<Grid container columnSpacing={{ xs: 1, md: 0 }}>
					<Grid item xs={4} md={3} lg={2}>
						<Typography fontWeight={600} mr={1}>
							{title}
						</Typography>
					</Grid>
					<Grid item xs={8} lg={10}>
						<Typography>{content ? content : <em>Not provided</em>}</Typography>
					</Grid>
				</Grid>
			</Box>
		);
	};

	const mapTrainingSessions = () => {
		return skillTrainingSessions
			.sort((a, b) => {
				if (new Date(a.date).getTime() > new Date(b.date).getTime()) {
					return trainingLogFilter === "Most recent" ? -1 : 1;
				} else {
					return trainingLogFilter === "Most recent" ? 1 : -1;
				}
			})
			.map((skillTrainingSession) => {
				return (
					<Box
						sx={{ borderBottom: "0.5px solid lightGray" }}
						key={skillTrainingSession.id}
					>
						<Accordion elevation={0} sx={{ backgroundColor: "transparent" }}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								sx={{ padding: 0 }}
							>
								<Box sx={{ display: "flex", flexDirection: "column" }}>
									<Box
										key={skillTrainingSession.id}
										sx={{ display: "flex", alignItems: "center" }}
									>
										<Typography fontWeight={500}>
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
									<Box mt={1}>
										<Typography display="inline" fontWeight={500}>
											Skill:{" "}
										</Typography>
										<Typography display="inline">
											{skillTrainingSession.skill.name}
										</Typography>
									</Box>
								</Box>
							</AccordionSummary>
							<AccordionDetails
								sx={{
									mb: 3,
									[theme.breakpoints.between("xs", "md")]: { p: 0 },
								}}
							>
								<TrainingSessionDetail
									title="Level marked"
									content={skillTrainingSession.progressCode.string}
								/>
								<TrainingSessionDetail
									title="Method Used"
									content={skillTrainingSession.trainingMethod.name}
								/>
								<TrainingSessionDetail
									title="Environment"
									content={skillTrainingSession.environment.name}
								/>
								<TrainingSessionDetail
									title="Trainer notes"
									content={skillTrainingSession.notes}
									isLast
								/>
							</AccordionDetails>
						</Accordion>
					</Box>
				);
			});
	};

	const mapTrainerNotes = () => {
		return skillTrainingSessions
			.filter((sts) => sts.notes)
			.sort((a, b) => {
				if (new Date(a.date).getTime() > new Date(b.date).getTime()) {
					return trainingLogFilter === "Most recent" ? -1 : 1;
				} else {
					return trainingLogFilter === "Most recent" ? 1 : -1;
				}
			})
			.map((skillTrainingSession) => {
				return (
					<Box
						py={3}
						key={skillTrainingSession.id}
						sx={{ borderBottom: "0.5px solid lightGray" }}
					>
						<Typography>{skillTrainingSession.notes}</Typography>
						<Typography color="gray" fontWeight={500}>
							<small>{convertDateToString(skillTrainingSession.date)}</small>
						</Typography>
					</Box>
				);
			});
	};

	return (
		<>
			<Box
				mt={3}
				sx={{
					[theme.breakpoints.between("sm", "md")]: {
						display: "flex",
						justifyContent: "space-between",
					},
					[theme.breakpoints.between("md", "xl")]: {
						display: "flex",
						justifyContent: "flex-end",
						gap: "16px",
					},
				}}
			>
				<FormGroup>
					<FormControlLabel
						control={<Checkbox checked={showNotes} />}
						onChange={() => setShowNotes(!showNotes)}
						label="Show Trainer Notes"
					/>
				</FormGroup>
				<FormControl
					size="small"
					variant="outlined"
					sx={{
						[theme.breakpoints.between("xs", "sm")]: {
							width: "100%",
						},
						[theme.breakpoints.between("sm", "xl")]: {
							width: "150px",
						},
					}}
				>
					<Select
						id="trainingLogFilter"
						value={trainingLogFilter}
						onChange={(event) => setTrainingLogFilter(event.target.value)}
					>
						<MenuItem value="Most recent">Most recent</MenuItem>
						<MenuItem value="Oldest">Oldest</MenuItem>
					</Select>
				</FormControl>
			</Box>
			<hr style={{ margin: "16px 0 0 0" }} />
			{!skillTrainingSessions || skillTrainingSessions.length === 0 ? (
				<Typography sx={{ mt: 2 }}>
					<em>No training session data available</em>
				</Typography>
			) : (
				<PaginationContainer
					count={
						showNotes
							? skillTrainingSessions.filter((sts) => sts.notes).length
							: skillTrainingSessions.length
					}
				>
					{showNotes ? mapTrainerNotes() : mapTrainingSessions()}
				</PaginationContainer>
			)}
		</>
	);
};

export default TrainingProgrammeLog;
