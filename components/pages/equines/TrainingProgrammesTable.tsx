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
import Link from "next/link";

const TrainingProgrammesTable = ({
	trainingProgrammes,
	data,
}: {
	trainingProgrammes: TrainingProgramme[];
	data: "active" | "inactive";
}) => {
	const mapTableRows = (trainingProgrammes: TrainingProgramme[]) => {
		return trainingProgrammes.map((trainingProgramme) => {
			return (
				<TableRow
					key={trainingProgramme.id}
					sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
				>
					<TableCell>
						<Link
							href={`/equines/${trainingProgramme.equine.id}/training-programmes/${trainingProgramme.id}`}
						>
							{trainingProgramme.trainingCategory.name}
						</Link>
					</TableCell>
					{data === "active" ? (
						<>
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
									convertDateToString(
										findLastTrainingSession(
											trainingProgramme.skillTrainingSessions
										)!.date
									)
								)}
							</TableCell>
						</>
					) : (
						<>
							<TableCell>
								{convertDateToString(trainingProgramme.startDate)}
							</TableCell>
							<TableCell>
								{convertDateToString(trainingProgramme.endDate)}
							</TableCell>
						</>
					)}
					<TableCell>
						{trainingProgramme.skillTrainingSessions.length}
					</TableCell>
				</TableRow>
			);
		});
	};

	const mapTableHead = () => {
		return (
			<TableHead>
				<TableCell>Training Category</TableCell>
				<TableCell>Started On</TableCell>
				{data === "active" ? (
					<>
						<TableCell>Last Date Trained</TableCell>
					</>
				) : (
					<>
						<TableCell>Ended On</TableCell>
					</>
				)}
				<TableCell>Training Sessions</TableCell>
			</TableHead>
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
					<Table sx={{ minWidth: 650 }} aria-label="equine table">
						{mapTableHead()}
						<TableBody>{mapTableRows(trainingProgrammes)}</TableBody>
					</Table>
				</TableContainer>
			)}
		</>
	);
};

export default TrainingProgrammesTable;
