import React from "react";

import { TrainingProgramme } from "../../../utils/types";

import { Typography, Box, Grid } from "@mui/material";
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
					<Grid container>
						{trainingProgramme.startDate ? (
							<>
								<Grid item xs={12} md={5}>
									<Typography>
										Started on&nbsp;
										{convertDateToString(trainingProgramme.startDate)}
									</Typography>
								</Grid>
								<Grid item xs={12} md={7}>
									<Typography>
										{trainingProgramme.skillTrainingSessions.length} Completed
										Training
										{trainingProgramme.skillTrainingSessions.length > 1
											? " Sessions"
											: " Session"}
									</Typography>
								</Grid>
							</>
						) : (
							<Grid item xs={12}>
								<Typography>
									<em>Not started</em>
								</Typography>
							</Grid>
						)}
					</Grid>
				);
			};

			const InActiveData = () => {
				return (
					<Grid container>
						<Grid item xs={12} md={5}>
							<Typography>
								Ended on&nbsp;
								{convertDateToString(trainingProgramme.endDate)}
							</Typography>
						</Grid>
						<Grid item xs={12} md={7}>
							<Typography>
								{trainingProgramme.skillTrainingSessions.length} Completed
								Training
								{trainingProgramme.skillTrainingSessions.length > 1
									? " Sessions"
									: " Session"}
							</Typography>
						</Grid>
					</Grid>
				);
			};

			return (
				<div key={trainingProgramme.id}>
					<Link
						href={`/equines/${trainingProgramme.equine.id}/training-programmes/${trainingProgramme.id}`}
					>
						<Box
							mt={3}
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								cursor: "pointer",
							}}
						>
							<Grid container>
								<Grid item xs={12} sm={5} md={3}>
									<Typography fontWeight={600}>
										{trainingProgramme.trainingCategory.name}
									</Typography>
								</Grid>
								<Grid item xs={12} sm={7} md={9}>
									{data === "active" ? <ActiveData /> : <InActiveData />}
								</Grid>
							</Grid>
							<KeyboardArrowRightIcon fontSize="large" />
						</Box>
					</Link>
				</div>
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
				mapTrainingProgrammeData(trainingProgrammes)
			)}
		</>
	);
};

export default TrainingProgrammesTable;
