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
import { Yard } from "../../../utils/types";

const EditEquineYard = ({
	equineId,
	currentYard,
}: {
	equineId: string;
	currentYard?: Yard;
}) => {
	const router = useRouter();
	const theme = useTheme();
	const [yardId, setYardId] = useState("");
	const { yards, fetchingYardData, error } = useYards();

	console.log(currentYard);

	if (fetchingYardData) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<LoadingSpinner />
			</Box>
		);
	}

	const assignEquineToYard = () => {
		console.log(yardId);
		axios
			.patch(
				`${process.env.NEXT_PUBLIC_URL}data/equines/${equineId}/yards/${yardId}`
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
				<InputLabel id="edit-yard-select-label">Change Yard</InputLabel>
				<Select
					labelId="edit-yard-select-label"
					id="edit-yard-select"
					value={yardId}
					label="Change Yard"
					onChange={(e) => setYardId(e.target.value)}
				>
					{yards.map((yard) => {
						return currentYard && yard.id === currentYard.id ? (
							<MenuItem disabled>{yard.name}</MenuItem>
						) : (
							<MenuItem key={yard.id} value={yard.id}>
								{yard.name}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
			<Button
				variant="contained"
				sx={{
					width: "100%",
					[theme.breakpoints.between("xs", "sm")]: {
						mt: 2,
					},
				}}
				onClick={assignEquineToYard}
			>
				Save
			</Button>
		</>
	);
};

export default EditEquineYard;
