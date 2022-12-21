import * as React from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Notification = ({
	state,
	message,
}: {
	state: "success" | "error";
	message?: string;
}) => {
	const [open] = React.useState(true);
	const [position] = React.useState<SnackbarOrigin>({
		vertical: "top",
		horizontal: "right",
	});

	const { vertical, horizontal } = position;

	return (
		<>
			{state === "error" && (
				<Snackbar
					anchorOrigin={{ vertical, horizontal }}
					key={vertical + horizontal}
					open={open}
					autoHideDuration={6000}
				>
					<Alert severity="error">An error occurred. Please try again.</Alert>
				</Snackbar>
			)}
			{state === "success" && (
				<Snackbar
					anchorOrigin={{ vertical, horizontal }}
					key={vertical + horizontal}
					open={open}
					autoHideDuration={6000}
				>
					<Alert severity="success">{message}</Alert>
				</Snackbar>
			)}
		</>
	);
};

export default Notification;
