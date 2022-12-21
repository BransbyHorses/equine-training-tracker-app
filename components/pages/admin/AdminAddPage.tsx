import React, { useEffect, useState } from "react";
import { TextField, Box, useTheme } from "@mui/material";
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import Notification from "../../Notification";
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
				{success && <Notification state="success" message={`New ${entity.toLowerCase()} created`} />}
				{error && <Notification state="error" />}
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
