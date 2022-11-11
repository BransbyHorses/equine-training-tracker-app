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
	Grid,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
	convertDateToString,
	findLastTrainingSession,
} from "../../../utils/helpers";

const TrainingProgrammeSkills = ({
	skillProgressRecords,
	skillTrainingSessions,
	setSkillsFocus,
}: {
	skillProgressRecords: SkillProgressRecord[];
	skillTrainingSessions: SkillTrainingSession[];
	setSkillsFocus: (id: number) => void;
}) => {
	const theme = useTheme();
	const [skillsFilter, setSkillsFilter] = useState("all");
	const [trainingProgrammeSkills, setTrainingProgrammeSkills] = useState<
		SkillProgressRecord[] | undefined
	>(skillProgressRecords);

	const handleSkillsFilterChange = (event: any) => {
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
				const lastTrainingSession = findLastTrainingSession(
					skillTrainingSessions.filter(
						(sts) => sts.skill.id === skillProgressRecord.skill.id
					)
				);

				return (
					<Box
						key={skillProgressRecord.id}
						onClick={() => setSkillsFocus(skillProgressRecord.skill.id)}
					>
						<Paper>
							<Box
								p={2}
								mt={2}
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									cursor: "pointer",
								}}
							>
								<Grid container>
									<Grid item xs={7} sm={7} md={5} lg={3}>
										<Typography fontWeight={500} color="primary.light">
											{skillProgressRecord.skill.name}
										</Typography>
									</Grid>
									<Grid
										item
										xs={5}
										sm={5}
										md={3}
										lg={3}
										sx={{ display: "flex", alignItems: "center" }}
									>
										<Typography fontWeight={400}>
											{skillProgressRecord.progressCode.string}
										</Typography>
									</Grid>
									<Grid
										item
										xs={12}
										md={4}
										color="gray"
										sx={{
											[theme.breakpoints.between("xs", "sm")]: {
												marginTop: "8px",
											},
										}}
									>
										<Typography>
											<small>
												{lastTrainingSession
													? `Last trained on ${convertDateToString(
															lastTrainingSession.date
													  )}`
													: "No training sessions"}
											</small>
										</Typography>
									</Grid>
								</Grid>

								<KeyboardArrowRightIcon fontSize="large" />
							</Box>
						</Paper>
					</Box>
				);
			});
	};

	if (skillProgressRecords!.length === 0) {
		return (
			<Box mt={2}>
				<Typography>
					<em>No skills data available</em>
				</Typography>
			</Box>
		);
	}

	return (
		<>
			<Box
				mt={3}
				sx={{
					display: "flex",
					justifyContent: "flex-end",
				}}
			>
				<FormControl
					size="small"
					variant="outlined"
					sx={{
						[theme.breakpoints.between("xs", "md")]: {
							width: "100%",
						},
						[theme.breakpoints.between("md", "xl")]: {
							width: "150px",
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
