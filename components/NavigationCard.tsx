import React from "react";
import { Typography, Grid, Paper, Box, IconButton } from "@mui/material";
import Link from "next/link";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export interface NavigationCardProps {
	link: string;
	title: string;
}

export default function NavigationCard({ link, title }: NavigationCardProps) {
	return (
		<Grid item xs={12} sm={6}>
			<Paper>
				<Link href={link}>
					<Box
						px={2}
						py={2}
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							cursor: "pointer",
						}}
					>
						<Typography variant="h6">{title}</Typography>
						<IconButton>
							<ArrowRightIcon fontSize="large" />
						</IconButton>
					</Box>
				</Link>
			</Paper>
		</Grid>
	);
}
