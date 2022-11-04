import React, { useEffect, useState } from "react";
import {
	Box,
	Grid,
	Radio,
	FormControl,
	FormControlLabel,
	RadioGroup,
	Typography,
} from "@mui/material";
import PageTitle from "../../../components/PageTitle";
import PageContainer from "../../../components/PageContainer";
import PrimaryButton from "../../../components/PrimaryButton";
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useRouter } from "next/router";
import getCollection from "../../../utils/hooks/getCollection";
import { Disruption, Equine } from "../../../utils/types";
import { convertDateToString, saveData } from "../../../utils/helpers";

export default function AddDisruption() {
	const router = useRouter();
	const [disruptions, setDisruptions] = useState<Disruption[]>([]);
	const [disruption, setDisruption] = useState<Disruption>();
	const [equine, setEquine] = useState<Equine | undefined>(undefined);
	const { fetchingData, collection, error } = getCollection("disruptions");

	useEffect(() => {
		if (router.isReady) {
			getEquineFromId(router.query.equineId as string);
			setDisruptions(collection);
		}
	}, [router.isReady]);

	const getEquineFromId = async (id: any) => {
		console.log("id is " + id);
		await fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines/${id}`)
			.then((response) => response.json())
			.then((data) => setEquine(data))
			.catch((rejected) => {
				console.log(rejected);
			});
	};

	const handleChange = (event: any) => {
		console.log(event.target.value);
		let updatedDisruption = disruptions.find(
			(disruption) => event.target.value == disruption.id
		);
		setDisruption(updatedDisruption);
		console.log(disruption);
	};

	const updateDisruption = async () => {
		saveData(
			"",
			`/equines/${equine?.id}/disruptions/${disruption?.id}/start`,
			"POST"
		);
		router.push("/");
	};

	if (fetchingData) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<LoadingSpinner />
			</Box>
		);
	}

	return (
		<Grid item xs={12} sm={6}>
			<PageContainer>
				<BackBreadcrumb />
				<PageTitle title="Add disruption" />
				<FormControl>
					<RadioGroup
						defaultValue="radioform"
						name="radio-buttons-group"
						onChange={handleChange}
					>
						{disruptions.map(({ id, string }: any) => {
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

				<PrimaryButton
					buttonText="Save"
					link="/"
					handleChange={updateDisruption}
				/>
			</PageContainer>
		</Grid>
	);
}
