import React, { useEffect, useState } from "react";
import { HealthAndSafetyFlag } from "../../../../utils/types";

import { Button, Box, TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import Notification from "../../../Notification";

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
				{success && <Notification state="success" message="New health & safety flag saved" />}
				{error && <Notification state="error" />}
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
