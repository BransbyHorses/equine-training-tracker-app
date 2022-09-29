import Table from "@mui/material/Table";
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

export default function Home() {
	const { fetchingData, equines, error } = useEquines();

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
				<Alert severity="error">An unexpected error occurred. Please refresh the page to try again.</Alert>
			</Box>
		);
  }

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell align="right">Yard</TableCell>
						<TableCell align="right">Status</TableCell>
						<TableCell align="right">Programme</TableCell>
						<TableCell align="right">Manage</TableCell>
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
						{}
					)}
					{/* {rows.map((row) => (
						<TableRow
							key={row.name}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{row.name}
							</TableCell>
							<TableCell align="right">{row.calories}</TableCell>
							<TableCell align="right">{row.fat}</TableCell>
							<TableCell align="right">{row.carbs}</TableCell>
							<TableCell align="right">{row.protein}</TableCell>
						</TableRow>
					))} */}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
