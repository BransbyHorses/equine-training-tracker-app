import { useEffect, useState } from "react";
import Link from "next/link";

import { useEquines } from "../utils/hooks/equine";
import { Equine, Yard } from "../utils/types";
import useYards from "../utils/hooks/useYards";

import Box from "@mui/material/Box";
import { Grid, IconButton, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import LoadingSpinner from "../components/LoadingSpinner";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import EquineListGrid from "../components/EquineListGrid";

export default function Home() {
	const { fetchingData, equines, error } = useEquines();
	const { fetchingYardData, yards, error: yardDataError } = useYards();
	const theme = useTheme();

	const [tableData, setTableData] = useState<Equine[]>([]);
	const [yardFilter, setYardFilter] = useState<string>("all");

	useEffect(() => {
		setTableData(equines);
	}, [equines]);

	const mapYardOptions = (yardsArray: Yard[]) => {
		if (yardDataError) {
			return <MenuItem disabled>Unavailable</MenuItem>;
		}

		return yardsArray.map((yard, i) => {
			return (
				<MenuItem key={yard.id} value={yard.name}>
					{yard.name}
				</MenuItem>
			);
		});
	};

	const filterEquinesByYard = (event: SelectChangeEvent) => {
		setYardFilter(event.target.value);

		event.target.value === "all"
			? setTableData(equines)
			: setTableData(
					equines.filter(
						(equine) => equine.yard && equine.yard.name === event.target.value
					)
			  );
	};

	const filterEquinesByName = (event: any) => {
		let filteredEquines: Equine[] = equines.filter(
			(equine) => equine.name.toLowerCase().indexOf(event.target.value) > -1
		);
		setTableData(filteredEquines);
	};

	if (fetchingData) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<LoadingSpinner />
			</Box>
		);
	}

	if (error) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Alert severity="error">An unexpected error occurred</Alert>
			</Box>
		);
	}

	return (
		<>
			<Box
				sx={{
					marginBottom: "20px",
					[theme.breakpoints.between("sm", "xl")]: {
						display: "flex",
					},
				}}
			>
				<FormControl
					sx={{
						minWidth: "150px",
						[theme.breakpoints.between("sm", "xl")]: {
							marginRight: "10px",
						},
						[theme.breakpoints.between("xs", "sm")]: {
							marginBottom: "10px",
						},
					}}
					size="small"
					variant="outlined"
				>
					<Select id="yard" value={yardFilter} onChange={filterEquinesByYard}>
						<MenuItem value="all">All Yards</MenuItem>
						{mapYardOptions(yards)}
					</Select>
				</FormControl>
				<TextField
					id="outlined-basic"
					label="Search equines"
					variant="outlined"
					size="small"
					fullWidth
					onChange={filterEquinesByName}
				/>
			</Box>
			<Box
				mb={2}
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Typography variant="h6" fontWeight={500}>
					Equines
				</Typography>
				<Typography color="gray" fontWeight={500}>
					<small>
						{equines.length > 0
							? `Showing ${tableData.length} of ${equines.length}`
							: `Showing 0 of 0`}
					</small>
				</Typography>
			</Box>
			<EquineListGrid equines={tableData} />
		</>
	);
}
