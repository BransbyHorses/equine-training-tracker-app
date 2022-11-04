import React, { useState, useEffect } from "react";
import useYards from "../../../utils/hooks/useYards";
import LoadingSpinner from "../../LoadingSpinner";
import {
	Box,
	Button,
	Select,
	useTheme,
	FormControl,
	MenuItem,
	InputLabel,
} from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { LearnerType, TrainingCategory, Yard } from "../../../utils/types";
import useLearnerTypes from "../../../utils/hooks/useLearnerTypes";
import useTrainingCategories from "../../../utils/hooks/useTrainingCategories";
import ResponsiveButton from "../../ResponsiveButton";

const ChangeTrainingProgramme = ({
	equineId,
	currentTrainingCategory,
}: {
	equineId: string;
	currentTrainingCategory?: TrainingCategory;
}) => {
	const router = useRouter();
	const theme = useTheme();
	const [newTrainingCategory, setNewTrainingCategory] = useState("");
	const { trainingCategories, error, fetchingData } = useTrainingCategories();

	if (fetchingData) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<LoadingSpinner />
			</Box>
		);
	}

	const changeEquineTrainingProgramme = () => {
		if (newTrainingCategory === "") return;
		axios
			.post(
				`${process.env.NEXT_PUBLIC_URL}data/training-programmes/${newTrainingCategory}/equine/${equineId}`
			)
			.then(() => {
				router.push(`/admin/equines/${equineId}`);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<>
			<FormControl fullWidth>
				<InputLabel id="edit-handling-status-select-label">
					Change Training Programme
				</InputLabel>
				<Select
					labelId="edit-training-category-select-label"
					id="edit-training-category-select-label"
					value={newTrainingCategory}
					label="Change Training Programme"
					onChange={(e) => setNewTrainingCategory(e.target.value)}
					required
				>
					{trainingCategories
						.sort((a, b) => {
							if (a.name < b.name) return -1;
							if (a.name > b.name) return 1;
							return 0;
						})
						.map((trainingCategory) => {
							return currentTrainingCategory &&
								trainingCategory.id === currentTrainingCategory.id ? (
								<MenuItem disabled key={trainingCategory.id}>
									{trainingCategory.name}
								</MenuItem>
							) : (
								<MenuItem key={trainingCategory.id} value={trainingCategory.id}>
									{trainingCategory.name}
								</MenuItem>
							);
						})}
				</Select>
			</FormControl>
			<ResponsiveButton
				desktopstyles={{ width: "20%" }}
				onClick={changeEquineTrainingProgramme}
			>
				Save
			</ResponsiveButton>
		</>
	);
};

export default ChangeTrainingProgramme;
