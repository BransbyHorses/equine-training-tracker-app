import React, { useEffect, useState } from "react";
import { HealthAndSafetyFlag } from "../../../../utils/types";

import {
	Button,
	Box,
	Typography,
	TextField,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const HealthAndSafetyFlagForm = ({
	saveFunction,
	closeForm,
	error,
	success,
	waiting,
}: {
	saveFunction: (_c: string) => void;
	closeForm: () => void;
	error: boolean;
	success: boolean;
	waiting: boolean;
	edit?: HealthAndSafetyFlag;
}) => {
	const [formContent, setFormContent] = useState("");

	useEffect(() => {
		if (success) setFormContent("");
	}, [success]);

	return (
		<>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<CancelIcon
					fontSize="medium"
					onClick={closeForm}
					sx={{ cursor: "pointer" }}
				/>
				{success && (
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<CheckCircleOutlineIcon
							fontSize="small"
							color="success"
							sx={{ marginRight: "5px" }}
						/>
						<Typography color="success">
							<small>New health & safety flag added.</small>
						</Typography>
					</Box>
				)}
				{error && (
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<ErrorOutlineIcon
							fontSize="small"
							color="error"
							sx={{ marginRight: "5px" }}
						/>
						<Typography color="error">
							<small>An error occurred. Please try again.</small>
						</Typography>
					</Box>
				)}
			</Box>
			<Box mt={2} sx={{ display: "flex", flexDirection: "column" }}>
				<TextField
					sx={{ marginBottom: "16px" }}
					variant="outlined"
					value={formContent}
					multiline
					rows={7}
					placeholder="Add new health and safety flag here..."
					onChange={(event) => setFormContent(event.target.value)}
				/>
				<Button
					sx={{ backgroundColor: "primary.light" }}
					variant="contained"
					onClick={() => saveFunction(formContent)}
					disabled={formContent === "" || waiting}
				>
					Save
				</Button>
			</Box>
		</>
	);
};

export default HealthAndSafetyFlagForm;
