import React, { useState } from "react";
import { TextField, Button, Box, useTheme } from "@mui/material";

const AdminEdit = ({
	editValue,
	saveFunction,
}: {
	editValue: any;
	saveFunction: (_n: string) => void;
}) => {
	const theme = useTheme();
	const [inputValue, setInputValue] = useState(editValue.name || "");

	return (
		<Box
			sx={{
				width: "100%",
				display: "flex",
				[theme.breakpoints.between("xs", "sm")]: {
					flexDirection: "column",
				},
				[theme.breakpoints.between("sm", "xl")]: {
					flexDirection: "row",
				},
			}}
		>
			<TextField
				fullWidth
				size="small"
				onChange={(e) => setInputValue(e.target.value)}
				value={inputValue}
				focused
				sx={{ mr: 2 }}
			/>
			<Button
				variant="contained"
				onClick={() => saveFunction(inputValue)}
				sx={{
					[theme.breakpoints.between("xs", "sm")]: {
						mt: 2,
					},
				}}
			>
				Save
			</Button>
		</Box>
	);
};

export default AdminEdit;
