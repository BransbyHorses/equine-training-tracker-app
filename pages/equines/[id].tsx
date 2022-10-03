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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import LoadingSpinner from "../../components/LoadingSpinner";
import { findLatestTrainingProgramme } from "../../utils/helpers";
import { TrainingProgramme } from "../../utils/types";

const EquineProfile = () => {
	const router = useRouter();
	const [equineId, setEquineId] = useState(undefined);
	const { fetchingData, equine, error, notFound } = useEquine(
		equineId,
		router.isReady
	);

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query.id);
		}
	}, [router.isReady]);

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

	const currentTrainingProgramme: TrainingProgramme =
		findLatestTrainingProgramme(equine?.trainingProgrammes || []);

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
								{equine && currentTrainingProgramme ? (
									<Typography>
										{currentTrainingProgramme.trainingCategory.name}
									</Typography>
								) : (
									<MoreHorizIcon sx={{ color: "gray" }} />
								)}
							</Item>
						</Grid>
						<Grid xs={12} md={6}>
							<Item>
								<Typography variant="h6">Current Yard</Typography>
								{equine && equine.yard ? (
									<Typography>{equine.yard.name}</Typography>
								) : (
									<MoreHorizIcon sx={{ color: "gray" }} />
								)}
							</Item>
						</Grid>
						<Grid xs={12} md={6}>
							<Item>
								<Typography variant="h6">Status</Typography>
								{equine && equine.equineStatus ? (
									<Typography>{equine.equineStatus.name}</Typography>
								) : (
									<MoreHorizIcon sx={{ color: "gray" }} />
								)}
							</Item>
						</Grid>
						<Grid xs={12} md={6}>
							<Item>
								<Typography variant="h6">Type of learner</Typography>
								{equine && equine.learnerType ? (
									<Typography>{equine.learnerType.name}</Typography>
								) : (
									<MoreHorizIcon sx={{ color: "gray" }} />
								)}
							</Item>
						</Grid>
					</Grid>
				</Box>
			</Paper>
			<hr style={{ margin: "20px 0" }} />
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
							<Typography variant="h6">View Training Programme</Typography>
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
		</>
	);
};

export default EquineProfile;
