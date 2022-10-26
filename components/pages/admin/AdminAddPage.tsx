import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const AdminAddPage = ({
	entity,
	saveFunction,
	success,
	error,
}: {
	entity: string;
	saveFunction: (n: string) => void;
	success?: boolean;
	error?: boolean;
}) => {
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		if (success) {
			setInputValue("");
		}
	}, [success]);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		saveFunction(inputValue);
	};

	return (
		<>
			<BackBreadcrumb />
			<Typography sx={{ mt: 2 }} variant="h6">
				Add New {entity}
			</Typography>
			{success && (
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<CheckCircleOutlineIcon
						fontSize="small"
						color="success"
						sx={{ marginRight: "5px" }}
					/>
					<Typography color="success">
						<small>New {entity.toLowerCase()} saved</small>
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
						<small>Unable to save training category</small>
					</Typography>
				</Box>
			)}
			<form onSubmit={handleSubmit}>
				<TextField
					fullWidth
					size="small"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					focused
					required
					sx={{ my: 2 }}
				/>
				<Button type="submit" variant="contained">
					Save
				</Button>
			</form>
		</>
	);
};

export default AdminAddPage;
