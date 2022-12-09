import React, { useEffect, useState } from "react";
import {
	Box,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Typography,
} from "@mui/material";
import PageTitle from "../../../../components/PageTitle";
import BackBreadcrumb from "../../../../components/BackBreadcrumb";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import { useRouter } from "next/router";
import useCollection from "../../../../utils/hooks/useCollection";
import { Status } from "../../../../utils/types";
import { saveData } from "../../../../utils/helpers";
import ResponsiveButton from "../../../../components/ResponsiveButton";

export default function EndTraining() {
	const router = useRouter();
	const [equineId, setEquineId] = useState<string | undefined>(undefined);
	const [equineStatusId, setEquineStatusId] = useState<Status | undefined>(
		undefined
	);
	const { fetchingData, collection } =
		useCollection("equine-statuses");

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query.equineId as string);
		}
	}, [router.isReady]);

	const handleChange = (event: any) => {
		setEquineStatusId(event.target.value);
	};

	const updateStatus = async () => {
		saveData(
			"",
			`equines/${equineId}/equine-status/${equineStatusId}`,
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
			<PageTitle title="End training permanently" />
			<Typography sx={{ mb: 2 }} color="gray">
				This will end the current training programme
			</Typography>
			<FormControl>
				<RadioGroup
					defaultValue="disruption-form"
					name="disruption-buttons-group"
					onChange={handleChange}
				>
					{collection
						.filter((status) => !status.categorisedAsTraining)
						.map(({ id, string }: any) => {
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
					onClick={updateStatus}
				>
					Save
				</ResponsiveButton>
			</Box>
		</>
	);
}
