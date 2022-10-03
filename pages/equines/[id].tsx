import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useEquine } from "../../utils/hooks/equine";

import { Box } from "@mui/system";
import {
	Alert,
	Breadcrumbs,
	Link,
	Typography,
	Paper,
	Grid,
	styled,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import LoadingSpinner from "../../components/LoadingSpinner";

const EquineProfile = () => {
	const router = useRouter();
	const { id: equineId } = router.query;
	const { fetchingData, equine, error, notFound } = useEquine(equineId);

	const Item = styled(Box)(({ theme }) => ({
		padding: theme.spacing(1.5),
	}));

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
			<Breadcrumbs aria-label="breadcrumb">
				<Link underline="hover" color="inherit" href="/">
					Equines
				</Link>
				<Typography color="text.primary">{equine?.name}</Typography>
			</Breadcrumbs>
			<Paper>
				<Box
					p={1}
					mt={2}
					color="common.white"
					sx={{ backgroundColor: "primary.light" }}
				>
					<Typography variant="h4">{equine?.name}</Typography>
				</Box>
				<Box py={1} sx={{ flexGrow: 1, backgroundColor: "common.white" }}>
					<Grid container sx={{ backgroundColor: "common.white" }}>
						<Grid xs={12} md={6}>
							<Item>
								<Typography variant="h6">Training Programme</Typography>
								{equine && equine.trainingProgrammes}
								{/* {!equine ? (
									<Typography>{equine?.yard.name}</Typography>
								) : (
									<Typography>
										<em>{equine?.name} is not in training.</em>
									</Typography>
								)} */}
							</Item>
						</Grid>
						<Grid xs={12} md={6}>
							<Item>
								<Typography variant="h6">
									Current Yard
									{equine && equine.yard ? (
										<Typography>{equine.yard.name}</Typography>
									) : (
										<Typography>
											<em>Not defined</em>
										</Typography>
									)}
								</Typography>
							</Item>
						</Grid>
						<Grid xs={12} md={6}>
							<Item>
								<Typography variant="h6">Status</Typography>
								{equine && equine.equineStatus ? (
									<Typography>{equine.equineStatus.name}</Typography>
								) : (
									<Typography>
										<em>No defined</em>
									</Typography>
								)}
							</Item>
						</Grid>
						<Grid xs={12} md={6}>
							<Item>
								<Typography variant="h6">Type of learner</Typography>
								{equine && equine.learnerType ? (
									<Typography>{equine.learnerType.name}</Typography>
								) : (
									<Typography>
										<em>Not defined</em>
									</Typography>
								)}
							</Item>
						</Grid>
					</Grid>
				</Box>
			</Paper>
			<hr style={{ margin: "20px 0" }} />
			<Box mt={2}>
				<Grid container rowSpacing={3} columnSpacing={2}>
					<Grid item xs={12} sm={6}>
						<Paper>
							<Box
								px={2}
								py={2}
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Typography variant="h6">Log Training</Typography>
								<AddCircleIcon fontSize="large" />
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Paper>
							<Box
								px={2}
								py={2}
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Typography variant="h6">ViewTraining Programme</Typography>
								<ArrowRightIcon fontSize="large" />
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Paper>
							<Box
								px={2}
								py={2}
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Typography variant="h6">Training History</Typography>
								<ArrowRightIcon fontSize="large" />
							</Box>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Paper>
							<Box
								px={2}
								py={2}
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Typography variant="h6">Update Details</Typography>
								<ArrowRightIcon fontSize="large" />
							</Box>
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default EquineProfile;
