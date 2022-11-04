import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import PageTitle from "../../../components/PageTitle";
import PageContainer from "../../../components/PageContainer";
import PrimaryButton from "../../../components/PrimaryButton";
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import RadioButtonsForm from "../../../components/RadioButtonsForm";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useRouter } from "next/router";
import getCollection from "../../../utils/hooks/getCollection";
import { DisruptionSimplified, Equine } from "../../../utils/types";
import { convertEnumStringKeyToName, saveData } from "../../../utils/helpers";
export default function AddDisruption() {

	
	const router = useRouter();
	const [disruptions, setDisruptions] = useState<DisruptionSimplified[]>([]);
	const [disruptionId, setDisruptionId] = useState<string>();
	const [equineId, setEquineId] = useState<string | undefined>(undefined);
	const { fetchingData, collection, error } = getCollection("disruptions");


	console.log("STATE")
	console.log(disruptions)
	
	useEffect(() => {
		if (router.isReady) {
			console.log(collection);
			setEquineId(router.query.equineId as string);
			console.log("COllection")
			convertEnumStringKeyToName(collection)
			console.log(collection);
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
			`/equines/${equineId}/disruptions/${disruptionId}/start`,
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
		<>
			<PageTitle title="Add disruption" />

			<RadioButtonsForm items={disruptions} handleChange={handleChange} />

			<PrimaryButton
				buttonText="Save"
				link="/"
				handleChange={updateDisruption}
			/>
		</>
	);
}
