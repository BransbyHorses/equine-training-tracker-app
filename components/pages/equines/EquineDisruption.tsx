import React from "react";

import { convertDateToString } from "../../../utils/helpers";
import { Disruption } from "../../../utils/types";

import { Box, Typography, Paper, useTheme } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const EquineDisruption = ({
	disruption,
	endFunction,
}: {
	disruption: Disruption;
	endFunction: () => void;
}) => {
	const theme = useTheme();
	return (
		<Paper>
			<Box
				p={2}
				mb={2}
				sx={{
					border: "2px solid #f57c00",
					borderRadius: "5px",
					[theme.breakpoints.between("md", "xl")]: {
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					},
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<ErrorIcon fontSize="medium" sx={{ color: "warning.dark", mr: 2 }} />
					<Box>
						<Typography fontWeight={700}>Disruption To Training</Typography>
						<Typography>
							{disruption.reason.string} - Since{" "}
							{convertDateToString(disruption.startDate)}
						</Typography>
					</Box>
				</Box>
				<Typography
					color="#42a5f5"
					onClick={endFunction}
					sx={{
						cursor: "pointer",
						[theme.breakpoints.between("xs", "md")]: {
							mt: 1,
						},
					}}
				>
					End and resume training
				</Typography>
			</Box>
		</Paper>
	);
};

export default EquineDisruption;
