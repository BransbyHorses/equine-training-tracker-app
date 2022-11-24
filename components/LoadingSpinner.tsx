import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingSpinner = (props: any) => {
	return (
		<Box sx={{ display: "flex" }}>
			<CircularProgress {...props} />
		</Box>
	);
};

export default LoadingSpinner;
