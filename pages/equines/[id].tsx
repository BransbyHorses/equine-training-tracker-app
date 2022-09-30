import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useEquine } from "../../utils/hooks/equine";

import { Box } from "@mui/system";
import { Alert, Breadcrumbs, Link, Typography, Paper } from "@mui/material";
import LoadingSpinner from "../../components/LoadingSpinner";

const EquineProfile = () => {
	const router = useRouter();
	const { id: urlId } = router.query;
	const { fetchingData, equine, error, notFound } = useEquine(urlId);

	if (fetchingData) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<LoadingSpinner />
			</Box>
		);
	}

	if ((error || notFound) && !equine) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Alert severity="error">
					{notFound
						? "No equine information found to display."
						: "An unexpected error occurred."}
				</Alert>
			</Box>
		);
	}

	return (
		<>
			<Breadcrumbs aria-label="breadcrumb" mb={3}>
				<Link underline="hover" color="inherit" href="/">
					Equines
				</Link>
				<Typography color="text.primary">{equine?.name}</Typography>
			</Breadcrumbs>
			<Paper>
				<Box p={3}>
					<Typography variant="h4">{equine?.name}</Typography>
				</Box>
			</Paper>
		</>
	);
};

export default EquineProfile;
