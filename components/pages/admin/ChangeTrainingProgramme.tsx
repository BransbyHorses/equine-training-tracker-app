import React, { useState } from "react";
import LoadingSpinner from "../../LoadingSpinner";
import {
	Box,
	Select,
	FormControl,
	MenuItem,
	InputLabel,
} from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { TrainingCategory } from "../../../utils/types";
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
	const [newTrainingCategory, setNewTrainingCategory] = useState("");
	const { trainingCategories, fetchingData } = useTrainingCategories();

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
				`${process.env.NEXT_PUBLIC_URL}/data/training-programmes/${newTrainingCategory}/equine/${equineId}`
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
				desktopstyles={{ width: "20%", mt: 3 }}
				onClick={changeEquineTrainingProgramme}
			>
				Save
			</ResponsiveButton>
		</>
	);
};

export default ChangeTrainingProgramme;
