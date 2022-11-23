import React, { useEffect, useState } from "react";
import {
	Box,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import PageTitle from "../../../../components/PageTitle";
import BackBreadcrumb from "../../../../components/BackBreadcrumb";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { useRouter } from "next/router";
import useCollection from "../../../../utils/hooks/useCollection";
import { saveData } from "../../../../utils/helpers";
import ResponsiveButton from "../../../../components/ResponsiveButton";

export default function AddDisruption() {
	const router = useRouter();
	const [disruptionId, setDisruptionId] = useState<string>();
	const [equineId, setEquineId] = useState<string | undefined>(undefined);
	const { fetchingData, collection, error } = useCollection("disruptions");

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query.equineId as string);
			console.log(collection);
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

			<FormControl>
				<RadioGroup
					defaultValue="disruption-form"
					name="disruption-buttons-group"
					onChange={handleChange}
				>
					{collection.map(({ id, string }: any) => {
						return (
							<FormControlLabel
								key={id}
								value={id}
								control={<Radio />}
								label={string}
							/>
						);
					})}
				</RadioGroup>
			</FormControl>

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
