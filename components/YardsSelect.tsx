import React, { useEffect, useState } from "react";
import { Yard } from "../utils/types";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useYards from "../utils/hooks/useYards";
import LoadingSpinner from "./LoadingSpinner";
import { Button } from "@mui/material";

const YardsSelect = ({
	handleSubmit,
	equineYard,
}: {
	handleSubmit: (id: string) => void;
	equineYard?: Yard;
}) => {
	const { yards, error, fetchingYardData } = useYards();
	const [yardId, setYardId] = useState<string>("0");

	console.log(yardId);

	useEffect(() => {
		equineYard ? setYardId(equineYard.id.toString()) : setYardId("0");
	}, [equineYard]);

	const handleChange = (e: SelectChangeEvent) => {
		setYardId(e.target.value);
	};

	if (fetchingYardData) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<LoadingSpinner />
			</Box>
		);
	}

	return (
		<>
			<FormControl fullWidth>
				<InputLabel id="yards-select">Yards</InputLabel>
				<Select
					labelId="yards-select"
					id="demo-simple-select"
					value={yardId}
					label="Yards"
					onChange={handleChange}
				>
					{yards.map((yard) => {
						return (
							<MenuItem
								value={yard.id}
								key={yard.id}
								disabled={equineYard && yard.id === equineYard.id}
							>
								{yard.name}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
			<Button
				sx={{ mt: 3 }}
				variant="contained"
				onClick={() => handleSubmit(yardId!)}
			>
				Save
			</Button>
		</>
	);
};

export default YardsSelect;
