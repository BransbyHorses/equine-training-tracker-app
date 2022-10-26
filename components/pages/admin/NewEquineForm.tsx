import React, { useState, useEffect } from "react";
import {
	Button,
	Select,
	Typography,
	Container,
	TextField,
	MenuItem,
	FormControl,
	Grid,
	InputLabel,
	Alert,
	Box,
	useTheme,
} from "@mui/material";
import { EquineStatus, LearnerType, Yard, Equine } from "../../../utils/types";
import BackBreadcrumb from "../../BackBreadcrumb";

const NewEquineForm = ({ nextStep }: { nextStep: (e: Equine) => void }) => {
	const theme = useTheme();
	const [newEquine, setNewEquine] = useState({
		name: "",
		yard: "",
		equineStatus: "",
		learnerType: "",
	});

	const [yards, setYards] = useState<Yard[] | []>([]);
	const [equineStatuses, setequineStatuses] = useState<EquineStatus[] | []>([]);
	const [learnerTypes, setLearnerTypes] = useState<LearnerType[] | []>([]);
	const [formSubmitting, setFormSubmitting] = useState(false);
	const [formError, setFormError] = useState("");

	const getEquineOptions = async () => {
		try {
			const res = await Promise.all([
				fetch(`${process.env.NEXT_PUBLIC_URL}/data/equine-statuses`),
				fetch(`${process.env.NEXT_PUBLIC_URL}/data/yards`),
				fetch(`${process.env.NEXT_PUBLIC_URL}/data/learner-types`),
			]);
			const data = await Promise.all(res.map((r) => r.json()));
			setequineStatuses(data[0]);
			setYards(data[1]);
			setLearnerTypes(data[2]);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getEquineOptions();
	}, []);

	const saveEquine = async (e: any) => {
		e.preventDefault();
		setFormError("");

		const equineToPost = {
			name: newEquine.name,
			yard: newEquine.yard
				? yards.find((yard) => yard.id === parseInt(newEquine.yard))
				: null,
			equineStatus: newEquine.equineStatus
				? equineStatuses.find(
						(equineStatus) =>
							equineStatus.id === parseInt(newEquine.equineStatus)
				  )
				: null,
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
			.then((data) => nextStep(data))
			.catch((err: any) => {
				console.error(err);
				setFormError("Unable to save equine. Please try again.");
			});
	};

	const handleChange = (e: any) => {
		setNewEquine({ ...newEquine, [e.target.name]: e.target.value });
	};

	return (
		<Container>
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
						<InputLabel id="equine-status">Training Status</InputLabel>
						<Select
							id="equine-status"
							label="Training Status"
							name="equineStatus"
							value={newEquine.equineStatus}
							onChange={handleChange}
							sx={{ mb: 4 }}
						>
							{equineStatuses.map((equineStatus: EquineStatus) => {
								return (
									<MenuItem value={equineStatus.id} key={equineStatus.id}>
										{equineStatus.name}
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
				<Button
					sx={{
						[theme.breakpoints.between("xs", "md")]: {
							width: "100%",
						},
					}}
					variant="contained"
					type="submit"
					disabled={formSubmitting}
				>
					Save & Continue
				</Button>
			</form>
		</Container>
	);
};

export default NewEquineForm;
