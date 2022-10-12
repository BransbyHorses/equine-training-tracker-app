import React from "react";

import { TrainingProgramme } from "../../../utils/types";

import { Paper, Typography, Box } from "@mui/material";
import { convertDateToString } from "../../../utils/helpers";
import Link from "next/link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const TrainingProgrammesTable = ({
	trainingProgrammes,
	data,
}: {
	trainingProgrammes: TrainingProgramme[];
	data: "active" | "inactive";
}) => {
	const mapTrainingProgrammeData = (
		trainingProgrammes: TrainingProgramme[]
	) => {
		return trainingProgrammes.map((trainingProgramme) => {
			const ActiveData = () => {
				return (
					<Box sx={{ cursor: "pointer" }}>
						{trainingProgramme.startDate ? (
							<Box>
								<Typography>
									Started on&nbsp;
									{convertDateToString(trainingProgramme.startDate)}
								</Typography>
								<Typography>
									{trainingProgramme.skillTrainingSessions.length} Completed
									Training
									{trainingProgramme.skillTrainingSessions.length > 1
										? " Sessions"
										: " Session"}
								</Typography>
							</Box>
						) : (
							<Typography>
								<em>Not started</em>
							</Typography>
						)}
					</Box>
				);
			};

			const InActiveData = () => {
				return (
					<Box>
						<Typography>
							Finished on
							{convertDateToString(trainingProgramme.endDate)}
						</Typography>
						<Typography>
							{trainingProgramme.skillTrainingSessions.length} Completed
							Training
							{trainingProgramme.skillTrainingSessions.length > 1
								? " Sessions"
								: " Session"}
						</Typography>
					</Box>
				);
			};

			return (
				<Link
					href={`/equines/${trainingProgramme.equine.id}/training-programmes/${trainingProgramme.id}`}
				>
					<Box
						key={trainingProgramme.id}
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							cursor: "pointer",
						}}
					>
						<div>
							<Typography fontWeight={600}>
								{trainingProgramme.trainingCategory.name}
							</Typography>
							{data === "active" ? <ActiveData /> : <InActiveData />}
						</div>
						<KeyboardArrowRightIcon fontSize="large" />
					</Box>
				</Link>
			);
		});
	};

	return (
		<>
			{trainingProgrammes.length === 0 ? (
				<Typography p={1}>
					<em>No training programmes to display</em>
				</Typography>
			) : (
				<>{mapTrainingProgrammeData(trainingProgrammes)}</>
			)}
		</>
	);
};

export default TrainingProgrammesTable;
