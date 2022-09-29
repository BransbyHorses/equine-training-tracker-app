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

import Typography from "@mui/material/Typography";
import { Equine } from "../utils/types";

export default function Home() {
	const { fetchingData, equines, error } = useEquines();

	// add a search filter using Hugo's autocomplete b

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
					An unexpected error occurred. Please refresh the page to try again.
				</Alert>
			</Box>
		);
	}

	const mapEquineRows = (equineArray: Equine[]) => {
		return equineArray.map((equine, i) => {
			return (
				<TableRow
					key={equine.id}
					sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
				>
					<TableCell component="th" scope="row">
						{equine.name}
					</TableCell>
					<TableCell component="th" scope="row">
						{equine.equineStatus ? equine.equineStatus.name : <MoreHorizIcon />}
					</TableCell>
					<TableCell component="th" scope="row">
						{equine.yard ? equine.yard.name : <MoreHorizIcon />}
					</TableCell>
					<TableCell component="th" scope="row">
						View
					</TableCell>
					<TableCell component="th" scope="row">
						<Button color="primary" variant="contained" sx={{ width: "100%" }}>
							View Profile
						</Button>
					</TableCell>
				</TableRow>
			);
		});
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Status</TableCell>
						<TableCell>Yard</TableCell>
						<TableCell>Training Programme</TableCell>
						<TableCell>Manage</TableCell>
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
					{equines.length === 0 && !fetchingData ? (
						<TableRow>
							<TableCell component="th">
								There are currently no equines to display.
							</TableCell>
						</TableRow>
					) : (
						mapEquineRows(equines)
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

// {/* {rows.map((row) => (
// 	<TableRow
// 		key={row.name}
// 		sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
// 	>
// 		<TableCell component="th" scope="row">
// 			{row.name}
// 		</TableCell>
// 		<TableCell align="right">{row.calories}</TableCell>
// 		<TableCell align="right">{row.fat}</TableCell>
// 		<TableCell align="right">{row.carbs}</TableCell>
// 		<TableCell align="right">{row.protein}</TableCell>
// 	</TableRow>
// ))} */}
