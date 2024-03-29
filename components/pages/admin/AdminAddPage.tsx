import React, { useEffect, useState } from "react";
import { TextField, Typography, Box, useTheme } from "@mui/material";
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ResponsiveButton from "../../ResponsiveButton";
import PageTitle from "../../PageTitle";

const AdminAddPage = ({
	entity,
	saveFunction,
	success,
	error,
}: {
	entity: string;
	saveFunction: (_s: string) => void;
	success?: boolean;
	error?: boolean;
}) => {
	const theme = useTheme();
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
			<Box
				mt={2}
				sx={{
					[theme.breakpoints.between("sm", "xl")]: {
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					},
				}}
			>
				<PageTitle title={`Add New ${entity}`} />
				{success && (
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<CheckCircleOutlineIcon
							fontSize="small"
							color="success"
							sx={{ mr: 1 }}
						/>
						<Typography color="success">
							<small>New {entity.toLowerCase()} saved</small>
						</Typography>
					</Box>
				)}
				{error && (
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<ErrorOutlineIcon fontSize="small" color="error" sx={{ mr: 1 }} />
						<Typography color="error">
							<small>Unable to save training category</small>
						</Typography>
					</Box>
				)}
			</Box>
			<form onSubmit={handleSubmit}>
				<TextField
					fullWidth
					size="small"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					focused
					required
					sx={{ mb: 3 }}
				/>
				<ResponsiveButton
					desktopstyles={{
						width: "20%",
					}}
					type="submit"
				>
					save
				</ResponsiveButton>
			</form>
		</>
	);
};

export default AdminAddPage;
