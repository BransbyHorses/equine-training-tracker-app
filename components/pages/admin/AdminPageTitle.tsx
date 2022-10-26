import React from "react";
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";

const AdminPageTitle = ({
	title,
	buttonLink,
}: {
	title: string;
	buttonLink: string;
}) => {
	return (
		<>
			<BackBreadcrumb />
			<Box
				my={3}
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Typography variant="h6">
					{title}
				</Typography>
				<Link href={buttonLink}>
					<Button>
						<AddIcon fontSize="small" />
						Add New
					</Button>
				</Link>
			</Box>
		</>
	);
};

export default AdminPageTitle;
