import { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useEquines from "../utils/hooks/useEquines";
import LoadingSpinner from "../components/LoadingSpinner";
import Alert from "@mui/material/Alert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";

import { Equine, Yard } from "../utils/types";
import useYards from "../utils/hooks/useYards";

export default function Home() {
	const { fetchingData, equines, error } = useEquines();
	const {
		fetchingData: fetchingYardData,
		yards,
		error: yardDataError,
	} = useYards();

	const [tableData, setTableData] = useState<Equine[]>([]);
	const [yardFilter, setYardFilter] = useState<string>("");

	useEffect(() => {
		setTableData(equines);
	}, [equines]);

	const mapEquineRows = (equineArray: Equine[]) => {
		return equineArray.map((equine) => {
			return (
				<TableRow
					key={equine.id}
					sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
				>
					<TableCell component="th" scope="row">
						<Link href={`/equines/${equine.id}`}>{equine.name}</Link>
					</TableCell>
					<TableCell component="th" scope="row">
						{equine.equineStatus ? equine.equineStatus.name : <MoreHorizIcon />}
					</TableCell>
					<TableCell component="th" scope="row">
						{equine.yard ? equine.yard.name : <MoreHorizIcon />}
					</TableCell>
					<TableCell component="th" scope="row">
						{equine.trainingProgrammes.length === 0 ? (
							<MoreHorizIcon />
						) : (
							<Link href="">View</Link>
						)}
					</TableCell>
				</TableRow>
			);
		});
	};

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
				<Alert severity="error">
					An unexpected error occurred. Please refresh the page.
				</Alert>
			</Box>
		);
	}

	return (
		<>
			<FormControl sx={{ minWidth: "150px" }} size="small">
				<InputLabel id="yard-label">Yard</InputLabel>
				<Select
					id="yard"
					labelId="yard-label"
					label="Yard"
					value={yardFilter}
					onChange={filterEquinesByYard}
				>
					<MenuItem value="all">All Yards</MenuItem>
					{mapYardOptions(yards)}
				</Select>
			</FormControl>
			<Box sx={{ margin: "20px 0px" }}>
				<TextField
					id="outlined-basic"
					label="Search equines"
					variant="outlined"
					size="small"
					fullWidth
				/>
			</Box>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Yard</TableCell>
							<TableCell>Current Training Programme</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{fetchingData && (
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
								}}
							>
								<LoadingSpinner />
							</Box>
						)}
						{tableData.length === 0 && !fetchingData ? (
							<TableRow>
								<TableCell component="th">
									There are currently no equines to display.
								</TableCell>
							</TableRow>
						) : (
							mapEquineRows(tableData)
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
