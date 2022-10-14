import React, { useState } from "react";
import { useRouter } from "next/router";
import {
	Typography,
	Box,
	Button,
	Breadcrumbs,
	Link,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	TextField,
} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

const HealthAndSafetyFlagForm = ({
	saveFunction,
}: {
	saveFunction: (c: string) => void;
}) => {
	const [newHandSFlag, setNewHandSFlag] = useState("");
	return (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			<TextField
				sx={{ marginBottom: "16px" }}
				variant="outlined"
				value={newHandSFlag}
				multiline
				rows={7}
				placeholder="Add new health and safety flag here..."
				onChange={(event) => setNewHandSFlag(event?.target.value)}
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
	);
};

const HealthAndSafetyPage = () => {
	const router = useRouter();
	const [equineId, setEquineId] = useState(undefined);
	const [showForm, setShowForm] = useState(true);

	const saveNewHealthAndSafetyFlag = async (content: string) => {
		axios
			.post(
				`${process.env.NEXT_PUBLIC_URL}data/equines/1/health-and-safety-flags`,
				{
					content,
				}
			)
			.then(({ data }) => {
				console.log(data);
			});
	};

	return (
		<>
			<Breadcrumbs>
				<Link
					underline="hover"
					color="inherit"
					sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
					onClick={() => router.back()}
				>
					<ArrowLeftIcon /> Back
				</Link>
			</Breadcrumbs>
			<Box mt={4}>
				<Accordion expanded={showForm}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon fontSize="medium" color="primary" />}
						onClick={() => setShowForm(!showForm)}
					>
						<Typography fontWeight={500}>
							Add New Health & Safety Flag
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<HealthAndSafetyFlagForm
							saveFunction={saveNewHealthAndSafetyFlag}
						/>
					</AccordionDetails>
				</Accordion>
			</Box>
		</>
	);
};

export default HealthAndSafetyPage;
