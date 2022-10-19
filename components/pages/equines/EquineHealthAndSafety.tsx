import React, { useEffect, useState } from "react";
import axios from "axios";
import { convertDateToString } from "../../../utils/helpers";
import { HealthAndSafetyFlag } from "../../../utils/types";

import { Button, Box, Typography, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

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
}) => {
	const [newHandSFlag, setNewHandSFlag] = useState("");

	useEffect(() => {
		if (success) {
			setNewHandSFlag("");
		}
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
					value={newHandSFlag}
					multiline
					rows={7}
					placeholder="Add new health and safety flag here..."
					onChange={(event) => setNewHandSFlag(event.target.value)}
				/>
				<Button
					sx={{ backgroundColor: "primary.light" }}
					variant="contained"
					onClick={() => saveFunction(newHandSFlag)}
					disabled={newHandSFlag === "" || waiting}
				>
					Save
				</Button>
			</Box>
		</>
	);
};

export const HealthAndSafetyFlags = ({
	closeFlags,
	healthAndSafetyFlags,
}: {
	closeFlags: () => void;
	healthAndSafetyFlags: HealthAndSafetyFlag[];
}) => {
	return (
		<>
			<Box mb={2} sx={{ display: "flex", justifyContent: "space-between" }}>
				<AddCircleIcon
					fontSize="medium"
					onClick={closeFlags}
					sx={{ curser: "pointer" }}
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
					{healthAndSafetyFlags.map((healthAndSafetyFlag) => {
						return (
							<Box borderBottom={0.5} pb={2} pt={2}>
								<Typography>{healthAndSafetyFlag.content}</Typography>
								<Typography color="gray">
									{" "}
									<small>
										Added {convertDateToString(healthAndSafetyFlag.dateCreated)}
									</small>
								</Typography>
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

	const saveNewFlag = (content: string) => {
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

	if (showFlags) {
		return (
			<HealthAndSafetyFlags
				closeFlags={openForm}
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
				saveFunction={saveNewFlag}
				waiting={sendingRequest}
				success={apiSuccess}
				error={apiError}
			/>
		);
	}
};

export default EquineHealthAndSafety;
