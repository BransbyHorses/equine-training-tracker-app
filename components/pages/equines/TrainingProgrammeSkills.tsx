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
	Grid,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const progressTagPalette = {
	"Not able": "#f6d7d2",
	"Just started": "#d2e2f1",
	"Ok with limits": "#1d70b8",
	Confident: "#005a30",
};

const TrainingProgrammeSkills = ({
	skillProgressRecords,
	skillTrainingSessions,
	setSkillsFocus,
	trainingProgrammeInProgress,
}: {
	skillProgressRecords: SkillProgressRecord[];
	skillTrainingSessions: SkillTrainingSession[];
	setSkillsFocus: (id: number) => void;
	trainingProgrammeInProgress: boolean;
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
			.map((skillProgressRecord, i) => {
				const sortedSkillTrainingSessions = skillTrainingSessions
					.filter(
						(skillTrainingSession) =>
							skillTrainingSession.skill.id === skillProgressRecord.skill.id
					)
					.sort((a, b) => {
						new Date(b.date) - new Date(a.date);
					});

				return (
					<Box onClick={() => setSkillsFocus(skillProgressRecord.skill.id)}>
						<Paper key={skillProgressRecord.id}>
							<Box
								p={2}
								mt={2}
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Grid container>
									<Grid item xs={7} md={4} lg={3}>
										<Typography fontWeight={600}>
											{skillProgressRecord.skill.name}
										</Typography>
									</Grid>
									<Grid
										item
										xs={5}
										md={4}
										lg={3}
										sx={{ display: "flex", alignItems: "center" }}
									>
										<div
											style={{
												width: "fit-content",
												marginLeft: "16px",
												padding: "2px 10px",
												textAlign: "center",
												backgroundColor:
													progressTagPalette[
														skillProgressRecord.progressCode.string
													],
												color:
													skillProgressRecord.progressCode.string ===
														ProgressCode["Not able"] ||
													skillProgressRecord.progressCode.string ===
														ProgressCode["Just started"]
														? "black"
														: "white",
											}}
										>
											<Typography fontWeight={500}>
												{skillProgressRecord.progressCode.string}
											</Typography>
										</div>
									</Grid>
								</Grid>

								<KeyboardArrowRightIcon fontSize="large" />
							</Box>
						</Paper>
					</Box>
				);
			});
	};

	return (
		<>
			<Box
				mt={4}
				sx={{
					display: "flex",
					justifyContent: "flex-end",
				}}
			>
				<Button
					color="primary"
					variant="contained"
					sx={{
						display: trainingProgrammeInProgress ? "flex" : "none",
						justifyContent: "space-between",
						[theme.breakpoints.between("xs", "md")]: {
							width: "50%",
							marginRight: "8px",
						},
						[theme.breakpoints.between("md", "xl")]: {
							width: "175px",
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
							marginLeft: trainingProgrammeInProgress ? "" : "auto",
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
