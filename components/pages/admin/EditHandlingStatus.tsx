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
import { LearnerType } from "../../../utils/types";
import useLearnerTypes from "../../../utils/hooks/useLearnerTypes";
import ResponsiveButton from "../../ResponsiveButton";

const EditHandlingStatus = ({
	equineId,
	currentStatus,
}: {
	equineId: string;
	currentStatus?: LearnerType;
}) => {
	const router = useRouter();
	const [newLearnerTypeId, setNewLearnerTypeId] = useState("");
	const { learnerTypes, fetchingData } = useLearnerTypes();

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
				`${process.env.NEXT_PUBLIC_URL}data/equines/${equineId}/learner-type/${newLearnerTypeId}`
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
			<ResponsiveButton
				desktopstyles={{ width: "20%", mt: 3 }}
				onClick={assignEquineANewHandlingStatus}
			>
				Save
			</ResponsiveButton>
		</>
	);
};

export default EditHandlingStatus;
