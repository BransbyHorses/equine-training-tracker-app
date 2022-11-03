import React, { useEffect, useState, Suspense } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import axios from "axios";

import { useEquine } from "../../../utils/hooks/equine";
import { Disruption } from "../../../utils/types";
import {
	findCurrentTrainingProgramme,
	findActiveDisruption,
} from "../../../utils/helpers";

const EquineHealthAndSafety = dynamic(
	() =>
		import(
			"../../../components/pages/equines/health-and-safety/EquineHealthAndSafety"
		),
	{ suspense: true }
);
const EquineDisruption = dynamic(
	() => import("../../../components/pages/equines/EquineDisruption"),
	{ suspense: true }
);

import CurrentTrainingProgramme from "../../../components/pages/equines/CurrentTrainingProgramme";
import LoadingSpinner from "../../../components/LoadingSpinner";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import IconButton from "@mui/material/IconButton";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlagIcon from "@mui/icons-material/Flag";

const EquineProfile = () => {
	const router = useRouter();
	const [equineId, setEquineId] = useState<string>();
	const { fetchingData, equine, error, notFound } = useEquine(
		router.isReady,
		equineId
	);
	const [activeDisruption, setActiveDisruption] = useState<Disruption | null>(
		null
	);

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query.equineId as string);
		}
	}, [router.isReady]);

	useEffect(() => {
		setActiveDisruption(findActiveDisruption(equine?.disruptions || []));
	}, [equine]);

	const isInTraining = findCurrentTrainingProgramme(equine?.trainingProgrammes);

	const endDisruption = () => {
		axios
			.post(
				`${process.env.NEXT_PUBLIC_URL}data/equines/${equineId}/disruptions/${
					activeDisruption!.id
				}/end`
			)
			.then(({ data }) => {
				setActiveDisruption(null);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	if (fetchingData) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<LoadingSpinner />
			</Box>
		);
	}

	if (error) {
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
				<Link href="/">
					<span style={{ color: "gray", cursor: "pointer" }}>Equines</span>
				</Link>
				<Typography color="text.primary">{equine?.name}</Typography>
			</Breadcrumbs>
			<Paper>
				<Box
					p={2}
					mt={2}
					sx={{
						backgroundColor: "primary.light",
						color: "common.white",
					}}
				>
					<Typography variant="h4">{equine?.name}</Typography>
				</Box>
			</Paper>
			<Box my={2}>
				<Paper>
					<Accordion sx={{ border: "2px solid #c62828" }}>
						<AccordionSummary
							expandIcon={
								<IconButton>
									<ExpandMoreIcon fontSize="medium" />
								</IconButton>
							}
						>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<FlagIcon fontSize="medium" color="error" />
								<Typography sx={{ ml: 1 }} variant="h6">
									Health & Safety Flags
								</Typography>
							</Box>
						</AccordionSummary>
						<AccordionDetails>
							<Suspense fallback={<LoadingSpinner />}>
								<EquineHealthAndSafety
									healthAndSafetyFlags={equine?.healthAndSafetyFlags || []}
									equineId={equineId!}
								/>
							</Suspense>
						</AccordionDetails>
					</Accordion>
				</Paper>
			</Box>
			<Paper>
				<Box p={2} sx={{ flexGrow: 1, backgroundColor: "common.white" }}>
					<Grid container rowSpacing={3} columnSpacing={2}>
						<Grid item xs={12} md={6}>
							<Typography variant="h6">
								Status
							</Typography>
							{equine && equine.equineStatus && (
								<Typography>
									{equine.equineStatus.categorisedAsTraining
										? `${equine.equineStatus.string}`
										: `Training Ended - ${equine.equineStatus.string}`}
								</Typography>
							)}
						</Grid>
						<Grid item xs={12} md={6}>
							<Typography variant="h6">Training Programme</Typography>
							<Typography>
								<CurrentTrainingProgramme
									trainingProgrammes={equine?.trainingProgrammes}
								/>
							</Typography>
						</Grid>
						<Grid item xs={12} md={6}>
							<Typography variant="h6">Yard</Typography>
							{equine && equine.yard ? (
								<Typography>{equine.yard.name}</Typography>
							) : (
								<Typography color="gray">
									<small>
										<em>No Yard</em>
									</small>
								</Typography>
							)}
						</Grid>
						<Grid item xs={12} md={6}>
							<Typography variant="h6">Handling Status</Typography>
							{equine && equine.learnerType ? (
								<Typography>{equine.learnerType.name}</Typography>
							) : (
								<Typography color="gray">
									<small>
										<em>No Handling Status</em>
									</small>
								</Typography>
							)}
						</Grid>
					</Grid>
				</Box>
			</Paper>
			<hr style={{ margin: "20px 0" }} />
			{activeDisruption && (
				<EquineDisruption
					disruption={activeDisruption}
					endFunction={endDisruption}
				/>
			)}
			<Grid container rowSpacing={3} columnSpacing={2}>
				{isInTraining && !activeDisruption && (
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
									<IconButton>
										<AddCircleIcon fontSize="large" color="success" />
									</IconButton>
								</Box>
							</Link>
						</Paper>
					</Grid>
				)}
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
								<IconButton>
									<ArrowRightIcon fontSize="large" />
								</IconButton>
							</Box>
						</Link>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Paper>
						<Link href={`/update-profile/${equine?.id}`}>
							<Box
								px={2}
								py={2}
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Typography variant="h6">Update Profile</Typography>
								<IconButton>
									<ArrowRightIcon fontSize="large" />
								</IconButton>
							</Box>
						</Link>
					</Paper>
				</Grid>
			</Grid>
		</>
	);
};

export default EquineProfile;
