import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";
import PageTitle from "../../../components/PageTitle";
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useRouter } from "next/router";
import { saveData } from "../../../utils/helpers";
import ResponsiveButton from "../../../components/ResponsiveButton";
import useLearnerTypes from "../../../utils/hooks/useLearnerTypes";

export default function ChangeHandlingStatus() {
	const router = useRouter();
	const [learnerType, setLearnerType] = useState<number | string>("");
	const [equineId, setEquineId] = useState<string | undefined>(undefined);
	const { learnerTypes, fetchingData, error } = useLearnerTypes();

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query.equineId as string);
		}
	}, [router.isReady]);

	const updateEquineLearnerType = () => {
		saveData(
			"",
			`equines/${equineId}/learner-types/${learnerType}`,
			"PATCH"
		);
		router.push(`/equines/${equineId}`);
	};

	if (fetchingData) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<LoadingSpinner />
			</Box>
		);
	}

	return (
		<>
			<BackBreadcrumb />
			<PageTitle title="Change handling status" />
			<FormControl fullWidth>
				<InputLabel id="learner-type-selection">Handling Status</InputLabel>
				<Select
					value={learnerType}
					label="Handling Status"
					onChange={(e) => setLearnerType(e.target.value)}
				>
					{learnerTypes.map(({ id, name }) => {
						return (
							<MenuItem key={id} value={id}>
								{name}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
			<ResponsiveButton
				onClick={updateEquineLearnerType}
				desktopstyles={{ width: "20%", mt: 3 }}
			>
				Save
			</ResponsiveButton>
		</>
	);
}
