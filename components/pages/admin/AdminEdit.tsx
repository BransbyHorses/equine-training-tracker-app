import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const AdminEdit = ({
	editValue,
	saveFunction,
}: {
	editValue: any;
	saveFunction: (n: string) => void;
}) => {
	const [inputValue, setInputValue] = useState(editValue.name || "");

	return (
		<>
			<TextField
				fullWidth
				size="small"
				onChange={(e) => setInputValue(e.target.value)}
				value={inputValue}
				focused
				sx={{ mr: 2 }}
			/>
			<Button variant="contained" onClick={() => saveFunction(inputValue)}>
				Save
			</Button>
		</>
	);
};

export default AdminEdit;
