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

	if (fetchingYardData) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<LoadingSpinner />
			</Box>
		);
	}

	const assignEquineToYard = () => {
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
					{yards
						.sort((a, b) => {
							if (a.name < b.name) return -1;
							if (a.name > b.name) return 1;
							return 0;
						})
						.map((yard) => {
							return currentYard && yard.id === currentYard.id ? (
								<MenuItem disabled key={yard.id}>
									{yard.name}
								</MenuItem>
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
					backgroundColor: "primary.light",
					[theme.breakpoints.between("xs", "lg")]: {
						width: "92%",
						position: "absolute",
						bottom: "24px",
						left: "50%",
						transform: "translate(-50%, -50%)",
					},
					[theme.breakpoints.between("lg", "xl")]: {
						width: "20%",
						mt: 3,
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
