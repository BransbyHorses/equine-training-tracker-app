import React from "react";
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import { Box, Button, Typography, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import AutoCompleteBox from "../../AutoCompleteBox";

const AdminPageTitle = ({
	title,
	buttonLink,
	contentLength,
}: {
	title: string;
	buttonLink: string;
	contentLength: number;
}) => {
	const theme = useTheme();

	return (
		<>
			<BackBreadcrumb />
			<Box
				my={3}
				sx={{
					[theme.breakpoints.between("sm", "xl")]: {
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					},
				}}
			>
				<Typography variant="h6">
					{title} ({contentLength})
				</Typography>
				<Link href={buttonLink}>
					<Button
						variant="contained"
						sx={{
							[theme.breakpoints.between("xs", "sm")]: {
								width: "100%",
								mt: 3,
							},
						}}
					>
						<AddIcon fontSize="small" />
						Add New
					</Button>
				</Link>
			</Box>
			<hr style={{ margin: "20px 0" }} />
		</>
	);
};

export default AdminPageTitle;
