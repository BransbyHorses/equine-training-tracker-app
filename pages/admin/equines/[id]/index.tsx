import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useEquine } from "../../../../utils/hooks/equine";

import EquineHealthAndSafety from "../../../../components/pages/equines/health-and-safety/EquineHealthAndSafety";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { findCurrentTrainingProgramme } from "../../../../utils/helpers";

import {
	Box,
	Alert,
	Paper,
	Typography,
	Grid,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	IconButton,
	MenuItem,
	Menu,
	Icon,
} from "@mui/material";
import LoadingSpinner from "../../../../components/LoadingSpinner";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlagIcon from "@mui/icons-material/Flag";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const OptionsMenu = ({ deleteEquine }: { deleteEquine: () => void }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const ITEM_HEIGHT = 48;
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? "long-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreHorizIcon fontSize="medium" sx={{ color: "white" }} />
			</IconButton>
			<Menu
				id="long-menu"
				MenuListProps={{
					"aria-labelledby": "long-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: "20ch",
					},
				}}
			>
				<MenuItem value="delete" onClick={deleteEquine}>
					Delete Equine
				</MenuItem>
			</Menu>
		</div>
	);
};

const EquineAdminPage: React.FC = (props) => {
	const router = useRouter();
	const [equineId, setEquineId] = useState<string | undefined>(undefined);
	const { fetchingData, equine, error, notFound } = useEquine(
		router.isReady,
		equineId
	);

	const currentTrainingProgramme = findCurrentTrainingProgramme(
		equine?.trainingProgrammes
	);

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query.id as string);
		}
	}, [router.isReady]);

	const deleteEquine = () => {
		fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines/${equine!.id}`, {
			method: "DELETE",
		})
			.then(() => {
				router.push("/admin/equines");
			})
			.catch((rejected) => {
				console.log(rejected);
			});
	};

	const ChangeLink = ({ role }: { role: string }) => {
		return (
			<Link href={`/admin/equines/${equineId}/edit?value=${role}`}>
				<Typography color="#42a5f5" sx={{ cursor: "pointer" }}>
					<small>Change</small>
				</Typography>
			</Link>
		);
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
			<Breadcrumbs>
				<Link href="/admin/equines">
					<span style={{ color: "gray", cursor: "pointer" }}>Equines</span>
				</Link>
				<Typography color="text.primary">{equine?.name}</Typography>
			</Breadcrumbs>
			<Paper>
				<Box
					p={2}
					mt={2}
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						backgroundColor: "primary.light",
						color: "common.white",
					}}
				>
					<Box>
						<Typography variant="h4" display="inline">
							{equine?.name}
						</Typography>
					</Box>
					<OptionsMenu deleteEquine={deleteEquine} />
				</Box>
				<Box p={2} sx={{ flexGrow: 1, backgroundColor: "common.white" }}>
					<Grid container rowSpacing={3} columnSpacing={4}>
						<Grid
							item
							xs={12}
							md={6}
							sx={{ display: "flex", justifyContent: "space-between" }}
						>
							<Box>
								<Typography variant="h6">Status</Typography>
								{equine && equine.equineStatus && (
									<Typography>{equine.equineStatus.string}</Typography>
								)}
							</Box>
							<ChangeLink role="equineStatus" />
						</Grid>
						<Grid
							item
							xs={12}
							md={6}
							sx={{ display: "flex", justifyContent: "space-between" }}
						>
							<Box>
								<Typography variant="h6">Training Programme</Typography>
								{currentTrainingProgramme ? (
									<Typography>
										{currentTrainingProgramme.trainingCategory.name}
									</Typography>
								) : (
									<Typography color="gray">
										<small>
											<em>No Training Programme</em>
										</small>
									</Typography>
								)}
							</Box>
							<ChangeLink role="trainingProgramme" />
						</Grid>
						<Grid
							item
							xs={12}
							md={6}
							sx={{ display: "flex", justifyContent: "space-between" }}
						>
							<Box>
								<Typography variant="h6">Yard</Typography>
								{equine && equine.yard ? (
									<Typography>{equine.yard.name}</Typography>
								) : (
									<Typography color="gray">
										<em>
											<small>No Yard</small>
										</em>
									</Typography>
								)}
							</Box>
							<ChangeLink role="yard" />
						</Grid>
						<Grid
							item
							xs={12}
							md={6}
							sx={{ display: "flex", justifyContent: "space-between" }}
						>
							<Box>
								<Typography variant="h6">Handling Status</Typography>
								{equine && equine.learnerType ? (
									<Typography>{equine.learnerType.name}</Typography>
								) : (
									<Typography color="gray">
										<em>
											<small>No Handling Status</small>
										</em>
									</Typography>
								)}
							</Box>
							<ChangeLink role="handlingStatus" />
						</Grid>
					</Grid>
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
		</>
	);
};

export default EquineAdminPage;
