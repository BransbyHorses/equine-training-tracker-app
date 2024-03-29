import React from "react";
import { Typography, Box } from "@mui/material";

export default function PageTitle(props: any) {
	return (
		<Box mb={2} sx={{ display: "flex", justifyContent: "space-between" }}>
			<Typography
				variant="h4"
				color="primary"
				sx={{
					fontSize: "24px",
					fontWeight: "700",
					color: "common.black",
				}}
			>
				{props.title}
			</Typography>
		</Box>
	);
}
