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
import { Disruption, Equine } from "../../../utils/types";
import { saveData } from "../../../utils/helpers";


export default function AddDisruption() {

	const router = useRouter();
	const [disruptions, setDisruptions] = useState<Disruption[]>([]);
	const [disruption, setDisruption] = useState<Disruption>();
	const [equine, setEquine] = useState<Equine | undefined>(undefined);
	const { fetchingData, collection, error } = getCollection(
		'disruptions'
	);

	useEffect(() => {
		if (router.isReady) {
			getEquineFromId(router.query.equineId as string);
			setDisruptions(convertEnumsToDisruptions(collection));
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
		let updatedDisruption = disruptions.find(disruption => event.target.value == disruption.name);
		setDisruption(updatedDisruption);
		console.log(disruption);
	}

	const updateDisruption = async () => {
		saveData("", `/equines/${equine?.id}/disruptions/${disruption?.id}/start`, 'POST');
		router.push('/');
    }

	const convertEnumsToDisruptions = (collection:any) => {
		let disruptionCollection: Disruption[] = [];
		collection.forEach((disruptionEnum:any) => {
			const disruption = {} as Disruption;
			disruption.name = disruptionEnum.string;
			disruption.id = disruptionEnum.id; 
			disruptionCollection.push(disruption);	
		});
		return disruptionCollection;
	}

	if (equine == undefined || collection == undefined) {
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
					handleChange={handleChange}
					items={disruptions} 
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
