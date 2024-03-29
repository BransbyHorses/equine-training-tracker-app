import React, { useState, useEffect } from "react";
import {
	Select,
	Typography,
	TextField,
	MenuItem,
	FormControl,
	Grid,
	InputLabel,
	Alert,
	Box,
} from "@mui/material";
import { LearnerType, Yard, Equine } from "../../../utils/types";
import BackBreadcrumb from "../../BackBreadcrumb";
import ResponsiveButton from "../../ResponsiveButton";

const NewEquineForm = ({ nextStep }: { nextStep: (_e: Equine) => void }) => {
	const [newEquine, setNewEquine] = useState({
		name: "",
		yard: "",
		learnerType: "",
	});

	const [yards, setYards] = useState<Yard[] | []>([]);
	const [learnerTypes, setLearnerTypes] = useState<LearnerType[] | []>([]);
	const [formSubmitting, setFormSubmitting] = useState(false);
	const [formError, setFormError] = useState("");

	const getEquineOptions = async () => {
		try {
			const res = await Promise.all([
				fetch(`${process.env.NEXT_PUBLIC_URL}/data/yards`),
				fetch(`${process.env.NEXT_PUBLIC_URL}/data/learner-types`),
			]);
			const data = await Promise.all(res.map((r) => r.json()));
			setYards(data[0]);
			setLearnerTypes(data[1]);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getEquineOptions();
	}, []);

	const saveEquine = async (e: any) => {
		e.preventDefault();
		setFormSubmitting(true);
		setFormError("");

		const equineToPost = {
			name: newEquine.name,
			yard: newEquine.yard
				? yards.find((yard) => yard.id === parseInt(newEquine.yard))
				: null,
			equineStatus: "Awaiting Training",
			learnerType: newEquine.learnerType
				? learnerTypes.find(
						(learnerType) => learnerType.id === parseInt(newEquine.learnerType)
				)
				: null,
			trainingProgrammes: [],
			healthAndSafetyFlags: [],
		};

		await fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(equineToPost),
		})
			.then((response) => response.json())
			.then((data) => {
				setFormSubmitting(true);
				nextStep(data);
			})
			.catch((err: any) => {
				setFormSubmitting(true);
				console.error(err);
				setFormError("Unable to save equine. Please try again.");
			});
	};

	const handleChange = (e: any) => {
		setNewEquine({ ...newEquine, [e.target.name]: e.target.value });
	};

	return (
		<>
			<Box mb={3}>
				<BackBreadcrumb />
			</Box>
			<Typography variant="h5" color="textSecondary" sx={{ mb: "1.5rem" }}>
				Add Equine
			</Typography>
			<form onSubmit={saveEquine}>
				<Grid container direction="column">
					<TextField
						id="name"
						label="Name"
						name="name"
						value={newEquine.name}
						onChange={handleChange}
						required
						sx={{ mb: 4 }}
					/>
					<FormControl>
						<InputLabel id="equine-status">Yard</InputLabel>
						<Select
							id="Yard"
							label="Age"
							name="yard"
							value={newEquine.yard}
							onChange={handleChange}
							sx={{ mb: 4 }}
						>
							{yards.map((yard: Yard) => {
								return (
									<MenuItem value={yard.id} key={yard.id}>
										{yard.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<FormControl>
						<InputLabel id="handling-status">Handing Status</InputLabel>
						<Select
							id="handling-status"
							label="Handling Status"
							name="learnerType"
							value={newEquine.learnerType}
							onChange={handleChange}
							sx={{ mb: 4 }}
						>
							{learnerTypes.map((learnerType: LearnerType) => {
								return (
									<MenuItem value={learnerType.id} key={learnerType.id}>
										{learnerType.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</Grid>
				{formError && (
					<Box>
						<Alert severity="error">{formError}</Alert>
					</Box>
				)}
				<ResponsiveButton
					desktopstyles={{
						width: "20%",
					}}
					type="submit"
					disabled={formSubmitting}
				>
					Save & Continue
				</ResponsiveButton>
			</form>
		</>
	);
};

export default NewEquineForm;
