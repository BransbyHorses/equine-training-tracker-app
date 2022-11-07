import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import PageTitle from "../../../components/PageTitle";
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import RadioButtonsForm from "../../../components/RadioButtonsForm";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useRouter } from "next/router";
import useCollection from "../../../utils/hooks/useCollection";
import { DisruptionSimplified, Equine } from "../../../utils/types";
import { convertEnumStringKeyToName, saveData } from "../../../utils/helpers";
import ResponsiveButton from "../../../components/ResponsiveButton";

export default function AddDisruption() {
	const router = useRouter();
	const [disruptionId, setDisruptionId] = useState<string>();
	const [equineId, setEquineId] = useState<string | undefined>(undefined);
	const { fetchingData, collection, error } = useCollection("disruptions");

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query.equineId as string);
			collection.forEach(convertEnumStringKeyToName);
		}
	}, [router.isReady]);

	const handleChange = (event: any) => {
		event.preventDefault;
		setDisruptionId(event.target.value);
	};

	const updateDisruption = async () => {
		saveData(
			"",
			`/equines/${equineId}/disruptions/${disruptionId}/start`,
			"POST"
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
			<PageTitle title="Add disruption" />

			<RadioButtonsForm items={collection} handleChange={handleChange} />

			<Box>
				<ResponsiveButton
					desktopstyles={{ width: "20%", mt: 3 }}
					onClick={updateDisruption}
				>
					Save
				</ResponsiveButton>
			</Box>
		</>
	);
}
