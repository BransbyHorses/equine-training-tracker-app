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
import { LearnerType, Yard } from "../../../utils/types";
import useLearnerTypes from "../../../utils/hooks/useLearnerTypes";

const EditHandlingStatus = ({
	equineId,
	currentStatus,
}: {
	equineId: string;
	currentStatus?: LearnerType;
}) => {
	const router = useRouter();
	const theme = useTheme();
	const [newLearnerTypeId, setNewLearnerTypeId] = useState("");
	const { learnerTypes, fetchingData, error } = useLearnerTypes();

	if (fetchingData) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<LoadingSpinner />
			</Box>
		);
	}

	const assignEquineANewHandlingStatus = () => {
		axios
			.patch(
				`${process.env.NEXT_PUBLIC_URL}data/equines/${equineId}/learner-types/${newLearnerTypeId}`
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
					Change Handling Status
				</InputLabel>
				<Select
					labelId="edit-handling-status-select-label"
					id="edit-handling-status-select"
					value={newLearnerTypeId}
					label="Change Handling Status"
					onChange={(e) => setNewLearnerTypeId(e.target.value)}
				>
					{learnerTypes
						.sort((a, b) => {
							if (a.name < b.name) return -1;
							if (a.name > b.name) return 1;
							return 0;
						})
						.map((learnerType) => {
							return currentStatus && learnerType.id === currentStatus.id ? (
								<MenuItem disabled key={learnerType.name}>
									{learnerType.name}
								</MenuItem>
							) : (
								<MenuItem value={learnerType.id} key={learnerType.id}>
									{learnerType.name}
								</MenuItem>
							);
						})}
				</Select>
			</FormControl>
			<Button
				variant="contained"
				sx={{
					mt: 3,
					[theme.breakpoints.between("xs", "sm")]: {
						width: "100%",
					},
					[theme.breakpoints.between("sm", "xl")]: {
						width: "20%",
					},
				}}
				onClick={assignEquineANewHandlingStatus}
			>
				Save
			</Button>
		</>
	);
};

export default EditHandlingStatus;
