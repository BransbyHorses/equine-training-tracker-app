import React, { useState } from "react";
import { useRouter } from "next/router";
import {
	Typography,
	Container,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Box,
	Alert,
	IconButton,
	useTheme,
} from "@mui/material";
import { Equine } from "../../../utils/types";
import useTrainingCategories from "../../../utils/hooks/useTrainingCategories";
import axios from "axios";

const NewEquineTrainingProgramme = ({
	equine,
	nextStep,
}: {
	equine: Equine;
	nextStep: (e: Equine) => void;
}) => {
	const router = useRouter();
	const theme = useTheme();
	const [trainingCategory, setTrainingCategory] = useState(0);
	const { trainingCategories, fetchingData, error } = useTrainingCategories();
	const [formSubmitting, setFormSubmitting] = useState(false);
	const [formError, setFormError] = useState("");

	const saveEquineTrainingProgramme = () => {
		if (trainingCategory === 0) {
			nextStep(equine);
		} else {
			axios
				.post(
					`${process.env.NEXT_PUBLIC_URL}/data/training-programmes/${trainingCategory}/equine/${equine.id}`
				)
				.then(({ data }) => {
					nextStep(equine);
				})
				.catch((err) => {
					setFormError("Unable to save training programme. Please try again.");
					console.error(err);
				});
		}
	};

	return (
		<Container>
			<Typography variant="h5" color="textSecondary" sx={{ mb: "1.5rem" }}>
				Select A Training Programme For {equine.name}
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
					{trainingCategories.map((trainingCategory, i) => {
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
			<Box mt={4}>
				<Button
					sx={{
						[theme.breakpoints.between("xs", "md")]: {
							width: "100%",
						},
					}}
					variant="contained"
					onClick={saveEquineTrainingProgramme}
					disabled={formSubmitting}
				>
					Save & Continue
				</Button>
			</Box>
		</Container>
	);
};

export default NewEquineTrainingProgramme;
