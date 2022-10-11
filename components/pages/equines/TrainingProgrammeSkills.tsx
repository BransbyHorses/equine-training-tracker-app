import React, { useState } from "react";
import {
	SkillProgressRecord,
	ProgressCode,
	SkillTrainingSession,
} from "../../../utils/types";

import {
	Box,
	Typography,
	FormControl,
	Select,
	MenuItem,
	Paper,
	useTheme,
	Button,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { convertDateToString } from "../../../utils/helpers";

const progressTagPalette = {
	"Not able": "#f6d7d2",
	"Just started": "#d2e2f1",
	"Ok with limits": "#1d70b8",
	Confident: "#005a30",
};

const TrainingProgrammeSkills = ({
	skillProgressRecords,
	skillTrainingSessions,
}: {
	skillProgressRecords: SkillProgressRecord[];
	skillTrainingSessions: SkillTrainingSession[];
}) => {
	const theme = useTheme();
	const [skillsFilter, setSkillsFilter] = useState("all");
	const [trainingProgrammeSkills, setTrainingProgrammeSkills] = useState<
		SkillProgressRecord[] | undefined
	>(skillProgressRecords);

	const handleSkillsFilterChange = (event) => {
		setSkillsFilter(event.target.value);
		event.target.value === "all"
			? setTrainingProgrammeSkills(skillProgressRecords)
			: setTrainingProgrammeSkills(
					skillProgressRecords.filter(
						(skillProgressRecord: SkillProgressRecord) =>
							skillProgressRecord.progressCode.string === event.target.value
					)
			  );
	};

	const mapProgressCodeToOptions = () => {
		return Object.keys(ProgressCode)
			.filter((v) => isNaN(Number(v)))
			.map((progressCode, i) => {
				return (
					<MenuItem key={i} value={progressCode}>
						{progressCode}
					</MenuItem>
				);
			});
	};

	const mapSkillProgressRecords = () => {
		return trainingProgrammeSkills
			?.sort((a, b) => {
				if (a.skill.name < b.skill.name) return -1;
				if (a.skill.name > b.skill.name) return 1;
				return 0;
			})
			.map((skillProgessRecord, i) => {
				const sortedSkillTrainingSessions = skillTrainingSessions
					.filter(
						(skillTrainingSession) =>
							skillTrainingSession.skill.id === skillProgessRecord.skill.id
					)
					.sort((a, b) => {
						new Date(b.date) - new Date(a.date);
					});

				const lastTrainingSession =
					sortedSkillTrainingSessions.length === 0 ? (
						<span>No training sessions</span>
					) : (
						`Last trained on ${convertDateToString(
							sortedSkillTrainingSessions[0].date
						)}`
					);

				return (
					<Paper key={skillProgessRecord.id}>
						<Box
							p={2}
							mt={2}
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Box
								sx={{
									[theme.breakpoints.between("md", "xl")]: {
										display: "flex",
										flexDirection: "row",
									},
								}}
							>
								<Box
									sx={{
										display: "flex",
										[theme.breakpoints.between("xs", "sm")]: {
											flexDirection: "column",
										},
									}}
								>
									<Typography fontWeight={600}>
										{skillProgessRecord.skill.name}
									</Typography>
									<Box
										sx={{
											[theme.breakpoints.between("xs", "sm")]: {
												margin: "8px 0",
											},
											[theme.breakpoints.between("sm", "xl")]: {
												margin: "0 16px",
											},
										}}
									>
										<div
											style={{
												width: "fit-content",
												padding: "2px 10px",
												textAlign: "center",
												backgroundColor:
													progressTagPalette[
														skillProgessRecord.progressCode.string
													],
												color:
													skillProgessRecord.progressCode.string ===
														ProgressCode["Not able"] ||
													skillProgessRecord.progressCode.string ===
														ProgressCode["Just started"]
														? "black"
														: "white",
											}}
										>
											<Typography fontWeight={500}>
												{skillProgessRecord.progressCode.string}
											</Typography>
										</div>
									</Box>
								</Box>
								<Typography color="gray">
									<small>{lastTrainingSession}</small>
								</Typography>
							</Box>
							<KeyboardArrowRightIcon fontSize="large" />
						</Box>
					</Paper>
				);
			});
	};

	return (
		<>
			<Box
				mt={4}
				sx={{
					display: "flex",
				}}
			>
				<Button
					color="primary"
					variant="contained"
					sx={{
						[theme.breakpoints.between("xs", "md")]: {
							width: "50%",
							marginRight: "8px",
						},
						[theme.breakpoints.between("md", "xl")]: {
							width: "200px",
							marginLeft: "auto",
							marginRight: "16px",
						},
					}}
				>
					Log training &nbsp;
					<AddCircleIcon fontSize="medium" />
				</Button>
				<FormControl
					size="small"
					variant="outlined"
					sx={{
						[theme.breakpoints.between("xs", "md")]: {
							width: "50%",
						},
						[theme.breakpoints.between("md", "xl")]: {
							width: "200px",
						},
					}}
				>
					<Select
						id="progressCode"
						value={skillsFilter}
						onChange={handleSkillsFilterChange}
					>
						<MenuItem value="all">Show All</MenuItem>
						{mapProgressCodeToOptions()}
					</Select>
				</FormControl>
			</Box>
			<Box mt={2}>
				{trainingProgrammeSkills && mapSkillProgressRecords()}
				{trainingProgrammeSkills && trainingProgrammeSkills.length === 0 && (
					<Typography>
						<em>No skills are marked as "{skillsFilter}"</em>
					</Typography>
				)}
			</Box>
		</>
	);
};

export default TrainingProgrammeSkills;
