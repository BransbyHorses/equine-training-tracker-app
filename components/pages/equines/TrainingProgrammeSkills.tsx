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

const TrainingProgrammeSkills = ({
	skillsProgressRecords,
}: {
	skillProgressRecords?: SkillProgressRecord[];
}) => {
	const [skillsFilter, setSkillsFilter] = useState("all");
	const [trainingProgrammeSkills, setTrainingProgrammeSkills] = useState<
		SkillProgressRecord[] | undefined
	>(skillsProgressRecords);

	const handleSkillsFilterChange = (event) => {
		setSkillsFilter(event.target.value);

		event.target.value === "all"
			? setTrainingProgrammeSkills(skillsProgressRecords)
			: setTrainingProgrammeSkills(
					skillsProgressRecords.filter(
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
		const skillProgessRecords =
			skillsFilter === "all"
				? trainingProgrammeSkills
				: trainingProgrammeSkills?.filter(
						(spr: SkillProgressRecord) =>
							spr.progressCode.string === skillsFilter
				  );

		return skillProgessRecords?.map((skillProgessRecord, i) => {
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
						<Box>
							<Typography fontWeight={600}>
								{skillProgessRecord.skill.name}
							</Typography>
							<Typography>{skillProgessRecord.progressCode.string}</Typography>
							<Typography>{skillProgessRecord.time} minutes</Typography>
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
				{skillsProgressRecords && mapSkillProgressRecords()}
				{skillsProgressRecords && skillsProgressRecords.length === 0 && (
					<Typography>
						<em>No skills marked as "{skillsFilter}"</em>
					</Typography>
				)}
			</Box>
		</>
	);
};

export default TrainingProgrammeSkills;
