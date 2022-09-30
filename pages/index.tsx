import { ChangeEventHandler, useEffect, useState } from "react";
import Link from "next/link";

import { useEquines } from "../utils/hooks/equine";
import { Equine, Yard } from "../utils/types";
import useYards from "../utils/hooks/useYards";

import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LoadingSpinner from "../components/LoadingSpinner";
import Alert from "@mui/material/Alert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";

export default function Home() {
	const { fetchingData, equines, error } = useEquines();
	const {
		fetchingData: fetchingYardData,
		yards,
		error: yardDataError,
	} = useYards();
	const theme = useTheme();

	const [tableData, setTableData] = useState<Equine[]>([]);
	const [yardFilter, setYardFilter] = useState<string>("all");

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
				<Alert severity="error">
					An unexpected error occurred. Please refresh the page.
				</Alert>
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
									<em>No equines found</em>
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
