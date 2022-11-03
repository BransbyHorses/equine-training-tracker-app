import React, { useEffect, useState } from "react";
import {Box, Grid} from "@mui/material";
import PageTitle from '../../../components/PageTitle';
import PageContainer from '../../../components/PageContainer';
import PrimaryButton from  '../../../components/PrimaryButton';
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
	const [equine, setEquine] = useState<Equine | undefined>(undefined);
	const { fetchingData, collection, error } = getCollection(
		'disruptions'
	);

	useEffect(() => {
		if (router.isReady) {
			getEquineFromId(router.query.equineId as string);
			collection.forEach(convertEnumStringKeyToName)
			console.log(collection);
			setDisruptions(collection);
		}
	}, [router.isReady]);

	const getEquineFromId = async (id:any) => {     
		console.log("id is " + id);
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines/${id}`)
            .then(response => response.json())
            .then(data => setEquine(data))
            .catch(rejected => {
                console.log(rejected);
            });
    }

	const handleChange = (event:any) => {
		console.log(event.target.value);
		console.log(event.target);
		setDisruptionId(event.target.value);
		console.log(disruptionId);
	}

	const updateDisruption = async () => {
		saveData("", `/equines/${equine?.id}/disruptions/${disruptionId}/start`, 'POST');
		router.push('/');
    }

	if (fetchingData) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<LoadingSpinner />
			</Box>
		);
	}

	return (
		<Grid 
			item xs={12} 
			sm={6} 
			>
			<PageContainer>
				<BackBreadcrumb/>
				<PageTitle title="Add disruption" />
    
				<RadioButtonsForm
					items={disruptions} 
					handleChange={handleChange}
				/>
	
				<PrimaryButton 
					buttonText="Save" 
					link="/"
					handleChange={updateDisruption}
				/>

			</PageContainer>
		</Grid>
	);
};
