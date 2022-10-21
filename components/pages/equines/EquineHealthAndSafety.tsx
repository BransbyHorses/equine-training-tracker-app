import React, { useEffect, useState } from "react";
import axios from "axios";
import { convertDateToString } from "../../../utils/helpers";
import { HealthAndSafetyFlag } from "../../../utils/types";

import {
	Button,
	Box,
	Typography,
	TextField,
	Menu,
	MenuItem,
	IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const HealthAndSafetyFlagForm = ({
	saveFunction,
	closeForm,
	error,
	success,
	waiting,
}: {
	saveFunction: (c: string) => void;
	closeForm: () => void;
	error: boolean;
	success: boolean;
	waiting: boolean;
	edit?: HealthAndSafetyFlag;
}) => {
	const [formContent, setFormContent] = useState("");

	useEffect(() => {
		if (success) setFormContent("");
	}, [success]);

	return (
		<>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<CancelIcon
					fontSize="medium"
					onClick={closeForm}
					sx={{ cursor: "pointer" }}
				/>
				{success && (
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<CheckCircleOutlineIcon
							fontSize="small"
							color="success"
							sx={{ marginRight: "5px" }}
						/>
						<Typography color="success">
							<small>New health & safety flag added.</small>
						</Typography>
					</Box>
				)}
				{error && (
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<ErrorOutlineIcon
							fontSize="small"
							color="error"
							sx={{ marginRight: "5px" }}
						/>
						<Typography color="error">
							<small>An error occurred. Please try again.</small>
						</Typography>
					</Box>
				)}
			</Box>
			<Box mt={2} sx={{ display: "flex", flexDirection: "column" }}>
				<TextField
					sx={{ marginBottom: "16px" }}
					variant="outlined"
					value={formContent}
					multiline
					rows={7}
					placeholder="Add new health and safety flag here..."
					onChange={(event) => setFormContent(event.target.value)}
				/>
				<Button
					sx={{ backgroundColor: "primary.light" }}
					variant="contained"
					onClick={() => saveFunction(formContent)}
					disabled={formContent === "" || waiting}
				>
					Save
				</Button>
			</Box>
		</>
	);
};

export const OptionsMenu = ({ deleteFlag }: { deleteFlag: () => void }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
				<MoreHorizIcon fontSize="small" />
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
				<MenuItem value="delete" onClick={deleteFlag}>
					Delete
				</MenuItem>
			</Menu>
		</div>
	);
};

export const HealthAndSafetyFlags = ({
	closeFlags,
	healthAndSafetyFlags,
	deleteFlag,
}: {
	closeFlags: () => void;
	healthAndSafetyFlags: HealthAndSafetyFlag[];
	deleteFlag: (id: number) => void;
}) => {
	return (
		<>
			<Box mb={2} sx={{ display: "flex", justifyContent: "space-between" }}>
				<AddCircleIcon
					fontSize="medium"
					onClick={closeFlags}
					sx={{ cursor: "pointer" }}
				/>
				<Typography>
					<em>
						{healthAndSafetyFlags!.length}{" "}
						{healthAndSafetyFlags!.length === 1 ? `Flag` : `Flags`}
					</em>
				</Typography>
			</Box>
			{healthAndSafetyFlags.length > 0 && (
				<Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
					{healthAndSafetyFlags.map((healthAndSafetyFlag, i, arr) => {
						return (
							<Box
								key={healthAndSafetyFlag.id}
								borderBottom={
									i < arr.length - 1 ? "0.5px solid lightGray" : "0"
								}
								pb={2}
								pt={2}
								sx={{ display: "flex", justifyContent: "space-between" }}
							>
								<Box mr={1}>
									<Typography>{healthAndSafetyFlag.content}</Typography>
									<Typography color="gray">
										<small>
											Added{" "}
											{convertDateToString(healthAndSafetyFlag.dateCreated)}
										</small>
									</Typography>
								</Box>
								<OptionsMenu
									deleteFlag={() => deleteFlag(healthAndSafetyFlag.id)}
								/>
							</Box>
						);
					})}
				</Box>
			)}
		</>
	);
};

const EquineHealthAndSafety = ({
	equineId,
	healthAndSafetyFlags,
}: {
	equineId: string;
	healthAndSafetyFlags?: HealthAndSafetyFlag[];
}) => {
	const [showFlags, setShowFlags] = useState(true);
	const [updatedhealthAndSafetyFlags, setUpdatedhealthAndSafetyFlags] =
		useState<HealthAndSafetyFlag[]>(healthAndSafetyFlags || []);
	const [apiError, setApiError] = useState(false);
	const [apiSuccess, setApiSuccess] = useState(false);
	const [sendingRequest, setSendingRequest] = useState(false);

	const openForm = () => {
		setShowFlags(false);
	};
	const openFlags = () => {
		setShowFlags(true);
		setApiError(false);
	};

	const saveHealhAndSafetyFlag = (content: string) => {
		setApiError(false);
		setSendingRequest(true);
		axios
			.post(
				`${process.env.NEXT_PUBLIC_URL}data/equines/${equineId}/health-and-safety-flags`,
				{
					content,
				}
			)
			.then(({ data }) => {
				setApiSuccess(true);
				setUpdatedhealthAndSafetyFlags([...updatedhealthAndSafetyFlags, data]);
			})
			.catch((err) => {
				setApiError(true);
			})
			.finally(() => {
				setSendingRequest(false);
				setTimeout(() => {
					setApiSuccess(false);
				}, 3000);
			});
	};

	const deleteHealhAndSafetyFlag = (healthAndSafetyFlagId: number) => {
		axios
			.delete(
				`${process.env.NEXT_PUBLIC_URL}data/health-and-safety-flags/${healthAndSafetyFlagId}`
			)
			.then(() => {
				setUpdatedhealthAndSafetyFlags(
					updatedhealthAndSafetyFlags.filter(
						(healthAndSafetyFlag) =>
							healthAndSafetyFlag.id !== healthAndSafetyFlagId
					)
				);
			})
			.catch((err) => {});
	};

	if (showFlags) {
		return (
			<HealthAndSafetyFlags
				closeFlags={openForm}
				deleteFlag={deleteHealhAndSafetyFlag}
				healthAndSafetyFlags={updatedhealthAndSafetyFlags.sort(
					(a, b) =>
						new Date(b.dateCreated).getTime() -
						new Date(a.dateCreated).getTime()
				)}
			/>
		);
	} else {
		return (
			<HealthAndSafetyFlagForm
				closeForm={openFlags}
				saveFunction={saveHealhAndSafetyFlag}
				waiting={sendingRequest}
				success={apiSuccess}
				error={apiError}
			/>
		);
	}
};

export default EquineHealthAndSafety;
