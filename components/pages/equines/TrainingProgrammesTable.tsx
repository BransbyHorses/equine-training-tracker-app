import React from "react";

import { TrainingProgramme } from "../../../utils/types";

import {
	TableContainer,
	TableHead,
	Table,
	TableCell,
	TableRow,
	TableBody,
	Paper,
	Typography,
} from "@mui/material";
import {
	convertDateToString,
	findCurrentTrainingProgramme,
	findLastTrainingSession,
} from "../../../utils/helpers";

const TrainingProgrammesTable = ({
	trainingProgrammes,
	data,
}: {
	trainingProgrammes: TrainingProgramme[];
	data: "active" | "inactive";
}) => {
	const mapTableRows = (trainingProgrammes: TrainingProgramme[]) => {
		if (data === "active") {
			return trainingProgrammes.map((trainingProgramme) => {
				const lastDateTrained = findLastTrainingSession(
					trainingProgramme.skillTrainingSessions
				);

				return (
					<TableRow key={trainingProgramme.id}>
						<TableCell>{trainingProgramme.trainingCategory.name}</TableCell>
						<TableCell>
							{trainingProgramme.startDate ? (
								convertDateToString(trainingProgramme.startDate)
							) : (
								<em>Not started</em>
							)}
						</TableCell>
						<TableCell>
							{!trainingProgramme.startDate ? (
								<em>Not started</em>
							) : (
								convertDateToString(lastDateTrained!.date)
							)}
						</TableCell>
						<TableCell>
							{trainingProgramme.skillProgressRecords.length}
						</TableCell>
						<TableCell>
							{trainingProgramme.skillTrainingSessions.length}
						</TableCell>
					</TableRow>
				);
			});
		}

		if (data === "inactive") {
			return trainingProgrammes.map((trainingProgramme, index) => {
				return (
					<TableRow key={trainingProgramme.id}>
						<TableCell>{trainingProgramme.trainingCategory.name}</TableCell>
						<TableCell>
							{convertDateToString(trainingProgramme.startDate)}
						</TableCell>
						<TableCell>
							{convertDateToString(trainingProgramme.endDate)}
						</TableCell>
						<TableCell>
							{trainingProgramme.skillProgressRecords.length}
						</TableCell>
						<TableCell>
							{trainingProgramme.skillTrainingSessions.length}
						</TableCell>
					</TableRow>
				);
			});
		}
	};

	const mapTableHead = () => {
		return (
			<>
				<TableCell>Training Category</TableCell>
				<TableCell>Start Date</TableCell>
				{data === "active" ? (
					<>
						<TableCell>Last Date Trained</TableCell>
						<TableCell>Skills in Training</TableCell>
					</>
				) : (
					<>
						<TableCell>End Date</TableCell>
						<TableCell>Skills Trained</TableCell>
					</>
				)}
				<TableCell>Training Sessions</TableCell>
			</>
		);
	};

	return (
		<>
			{trainingProgrammes.length === 0 ? (
				<Typography p={1}>
					<em>No training programmes to display</em>
				</Typography>
			) : (
				<TableContainer component={Paper}>
					<Table>
						<TableHead>{mapTableHead()}</TableHead>
						<TableBody>{mapTableRows(trainingProgrammes)}</TableBody>
					</Table>
				</TableContainer>
			)}
		</>
	);
};

export default TrainingProgrammesTable;
