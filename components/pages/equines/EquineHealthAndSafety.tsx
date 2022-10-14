import React, { useState } from "react";
import axios from "axios";
import { HealthAndSafetyFlag } from "../../../utils/types";
import { Button, Box, Typography, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const HealthAndSafetyFlagForm = ({
	saveFunction,
	closeForm,
}: {
	saveFunction: (c: string) => void;
	closeForm: () => void;
}) => {
	const [newHandSFlag, setNewHandSFlag] = useState("");
	return (
		<>
			<CancelIcon
				fontSize="medium"
				onClick={closeForm}
				sx={{ cursor: "pointer" }}
			/>
			<Box mt={2} sx={{ display: "flex", flexDirection: "column" }}>
				<TextField
					sx={{ marginBottom: "16px" }}
					variant="outlined"
					value={newHandSFlag}
					multiline
					rows={7}
					placeholder="Add new health and safety flag here..."
					onChange={() => setNewHandSFlag(event?.target.value)}
				/>
				<Button
					color="primary"
					variant="contained"
					onClick={() => saveFunction(newHandSFlag)}
					disabled={newHandSFlag === ""}
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
								<small>Added {healthAndSafetyFlag.dateCreated}</small>
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

	const openForm = () => {
		setShowFlags(false);
	};
	const openFlags = () => {
		setShowFlags(true);
	};

	const saveFlag = (content: string) => {
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
			<HealthAndSafetyFlagForm closeForm={openFlags} saveFunction={saveFlag} />
		);
	}
};

export default EquineHealthAndSafety;
