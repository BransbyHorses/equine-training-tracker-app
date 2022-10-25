import React, { useEffect, useState } from "react";
import {TextField, Button } from "@mui/material";
import { TrainingCategory } from "../../../utils/types";

const TrainingCategoriesEdit = ({
	trainingCategory,
	saveFunction,
}: {
	trainingCategory?: TrainingCategory;
	saveFunction: (n: string) => void;
}) => {
	const [inputValue, setInputValue] = useState(trainingCategory!.name || "");

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

export default TrainingCategoriesEdit;
