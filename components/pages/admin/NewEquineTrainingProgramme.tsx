import React, { useState } from "react";
import {
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Box,
	Alert,
} from "@mui/material";
import { Equine } from "../../../utils/types";
import useTrainingCategories from "../../../utils/hooks/useTrainingCategories";
import axios from "axios";
import ResponsiveButton from "../../ResponsiveButton";

const NewEquineTrainingProgramme = ({
	equine,
	nextStep,
}: {
	equine: Equine;
	nextStep: (_e: Equine) => void;
}) => {
	const [trainingCategory, setTrainingCategory] = useState<string | number>(0);
	const { trainingCategories } = useTrainingCategories();
	const [formSubmitting, setFormSubmitting] = useState(false);
	const [formError, setFormError] = useState("");

	const saveEquineTrainingProgramme = () => {
		setFormSubmitting(true)
		if (trainingCategory === 0) {
			nextStep(equine);
		} else {
			axios
				.post(
					`${process.env.NEXT_PUBLIC_URL}data/training-programmes/${trainingCategory}/equine/${equine.id}`
				)
				.then(() => {
					setFormSubmitting(false);
					nextStep(equine);
				})
				.catch((err) => {
					setFormSubmitting(false);
					setFormError("Unable to save training programme. Please try again.");
					console.error(err);
				});
		}
	};

	return (
		<>
			<Typography variant="h5" color="textSecondary" sx={{ mb: 4 }}>
				Select a training programme for {equine.name}
			</Typography>
			<FormControl fullWidth>
				<InputLabel id="trainingProgramme">Training Programme</InputLabel>
				<Select
					id="trainingProgramme"
					label="Training Programme"
					name="trainingProgramme"
					value={trainingCategory}
					onChange={(e) => setTrainingCategory(e.target.value)}
				>
					<MenuItem value={0}> No Training Programme</MenuItem>
					{trainingCategories.map((trainingCategory) => {
						return (
							<MenuItem value={trainingCategory.id} key={trainingCategory.id}>
								{trainingCategory.name}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
			{formError && (
				<Box my={2}>
					<Alert severity="error">{formError}</Alert>
				</Box>
			)}
			<ResponsiveButton
				desktopstyles={{
					mt: 3,
					width: "20%",
				}}
				onClick={saveEquineTrainingProgramme}
				disabled={formSubmitting}
			>
				Save & Continue
			</ResponsiveButton>
		</>
	);
};

export default NewEquineTrainingProgramme;
