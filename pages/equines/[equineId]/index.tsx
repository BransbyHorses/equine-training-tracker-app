import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useEquine } from "../../../utils/hooks/equine";

import { Box } from "@mui/system";
import {
	Alert,
	Breadcrumbs,
	Link as MuiLink,
	Typography,
	Paper,
	Grid,
	styled,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import LoadingSpinner from "../../../components/LoadingSpinner";
import CurrentTrainingProgramme from "../../../components/pages/equines/CurrentTrainingProgramme";
import { findCurrentTrainingProgramme } from "../../../utils/helpers";

const EquineProfile = () => {
	const router = useRouter();
	const [equineId, setEquineId] = useState<string | undefined>(undefined);
	const { fetchingData, equine, error, notFound } = useEquine(
		router.isReady,
		equineId
	);

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query.equineId);
		}
	}, [router.isReady]);

	const isInTraining = findCurrentTrainingProgramme(equine?.trainingProgrammes);

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

	if (error && !equine) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Alert severity="error">
					{notFound
						? "No equine information available"
						: "An unexpected error occurred"}
				</Alert>
			</Box>
		);
	}

	return (
		<>
			<Breadcrumbs aria-label="breadcrumb">
				<MuiLink underline="hover" color="inherit" href="/">
					Equines
				</MuiLink>
				<Typography color="text.primary">{equine?.name}</Typography>
			</Breadcrumbs>
			<Paper>
				<Box
					p={2}
					mt={2}
					color="common.white"
					sx={{ backgroundColor: "primary.light" }}
				>
					<Typography variant="h4">{equine?.name}</Typography>
				</Box>
				<Box p={2} sx={{ flexGrow: 1, backgroundColor: "common.white" }}>
					<Grid container>
						<Grid xs={12} md={6}>
							<Item>
								<Typography variant="h6">Training Programme</Typography>
								<Typography>
									<CurrentTrainingProgramme
										trainingProgrammes={equine?.trainingProgrammes}
									/>
								</Typography>
							</Item>
						</Grid>
						<Grid xs={12} md={6}>
							<Item>
								<Typography variant="h6">Yard</Typography>
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
						<Link href={`/equines/${equineId}/add-training`}>
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
								<Typography variant="h6">Add Training</Typography>
								<AddCircleIcon fontSize="large" color="success" />
							</Box>
						</Link>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Paper>
						<Link href={`/equines/${equineId}/training-history`}>
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
								<Typography variant="h6">Training History</Typography>
								<ArrowRightIcon fontSize="large" />
							</Box>
						</Link>
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
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<ReportProblemIcon fontSize="medium" />
								<Typography sx={{ ml: 1 }} variant="h6">
									Health & Safety
								</Typography>
							</Box>
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
