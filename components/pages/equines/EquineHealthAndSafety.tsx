import React, { useState } from "react";
import axios from "axios";
import { HealthAndSafetyFlag } from "../../../utils/types";
import { Button, Box, Typography, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { convertDateToString } from "../../../utils/helpers";

const HealthAndSafetyFlagForm = ({
	saveFunction,
	closeForm,
	error,
	waiting,
}: {
	saveFunction: (c: string) => void;
	closeForm: () => void;
	error: boolean;
	waiting: boolean;
}) => {
	const [newHandSFlag, setNewHandSFlag] = useState("");
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
				{error && (
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<ErrorOutlineIcon
							fontSize="small"
							color="error"
							sx={{ marginRight: "5px" }}
						/>
						<Typography color="error">
							<small>An error occurred. Try again.</small>
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
					onChange={() => setNewHandSFlag(event.target.value)}
				/>
				<Button
					color="primary"
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

const HealthAndSafetyFlags = ({
	closeFlags,
	healthAndSafetyFlags,
}: {
	closeFlags: () => void;
	healthAndSafetyFlags?: HealthAndSafetyFlag[];
}) => {
	if (!healthAndSafetyFlags || healthAndSafetyFlags.length === 0) {
		return (
			<Box pt={2}>
				<Typography>
					<em>Not Health & Safety Flags</em>
				</Typography>
			</Box>
		);
	}
	{
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
							{healthAndSafetyFlags.length}{" "}
							{healthAndSafetyFlags.length === 1 ? `Flag` : `Flags`}
						</em>
					</Typography>
				</Box>
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
			</>
		);
	}
};

const EquineHealthAndSafety = ({
	equineId,
	healthAndSafetyFlags,
}: {
	equineId: number;
	healthAndSafetyFlags?: HealthAndSafetyFlag[];
}) => {
	const [showFlags, setShowFlags] = useState(true);
	const [updatedhealthAndSafetyFlags, setUpdatedhealthAndSafetyFlags] =
		useState<HealthAndSafetyFlag[]>(healthAndSafetyFlags || []);
	const [apiError, setApiError] = useState(false);
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
				setUpdatedhealthAndSafetyFlags([...updatedhealthAndSafetyFlags, data]);
			})
			.catch((err) => {
				setApiError(true);
			})
			.finally(() => {
				setSendingRequest(false);
			});
	};

	if (showFlags) {
		return (
			<HealthAndSafetyFlags
				closeFlags={openForm}
				healthAndSafetyFlags={updatedhealthAndSafetyFlags}
			/>
		);
	} else {
		return (
			<HealthAndSafetyFlagForm
				closeForm={openFlags}
				saveFunction={saveNewFlag}
				waiting={sendingRequest}
				error={apiError}
			/>
		);
	}
};

export default EquineHealthAndSafety;
