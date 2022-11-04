import React, { useState } from "react";
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
import ResponsiveButton from "../../ResponsiveButton";

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
			<ResponsiveButton
				desktopstyles={{ width: "20%", mt: 2 }}
				onClick={assignEquineToYard}
			>
				Save
			</ResponsiveButton>
		</>
	);
};

export default EditEquineYard;
