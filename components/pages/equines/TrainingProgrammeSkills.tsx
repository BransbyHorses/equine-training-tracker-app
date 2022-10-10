import React, { useState } from "react";
import { SkillProgressRecord, ProgressCode } from "../../../utils/types";

import {
	Box,
	Typography,
	FormControl,
	Select,
	MenuItem,
	Paper,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const progressTagPalette = {
	"Not able": "#f6d7d2",
	"Just started": "#d2e2f1",
	"Ok with limits": "#1d70b8",
	Confident: "#005a30",
};

const TrainingProgrammeSkills = ({
	skillProgressRecords,
}: {
	skillProgressRecords?: SkillProgressRecord[];
}) => {
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
		return trainingProgrammeSkills?.map((skillProgessRecord, i) => {
			return (
				<Paper key={skillProgessRecord.id}>
					<Box
						py={1}
						px={2}
						mb={2}
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
							}}
						>
							<Typography fontWeight={600}>
								{skillProgessRecord.skill.name}
							</Typography>
							<div
								style={{
									marginLeft: "24px",
									padding: "2px 10px",
									backgroundColor:
										progressTagPalette[skillProgessRecord.progressCode.string],
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
						<ArrowRightIcon fontSize="large" />
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
					justifyContent: "space-between",
					alignItems: "flex-end",
				}}
			>
				<Typography variant="h5" color="gray">
					Skill Records
				</Typography>
				<FormControl size="small" variant="outlined" sx={{ minWidth: "150px" }}>
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
			<hr style={{ margin: "16px 0" }} />
			<Box>
				{trainingProgrammeSkills && mapSkillProgressRecords()}
				{trainingProgrammeSkills && trainingProgrammeSkills.length === 0 && (
					<Typography>
						<em>No skills marked as "{skillsFilter}"</em>
					</Typography>
				)}
			</Box>
		</>
	);
};

export default TrainingProgrammeSkills;
