import React, { useEffect, useState } from "react";
import {
	FormControl,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
    Typography
	} from "@mui/material";
import PageTitle from '../../../components/PageTitle';
import PageContainer from '../../../components/PageContainer';
import PrimaryButton from  '../../../components/PrimaryButton';
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import RadioButtonsForm from "../../../components/RadioButtonsForm";
import { useRouter } from "next/router";
import getCollection from "../../../utils/hooks/getCollection";
import { Disruption } from "../../../utils/types";
import { saveData } from "../../../utils/helpers";


export default function AddDisruption() {

	const router = useRouter();
	const [disruptions, setDisruptions] = useState<Disruption[]>([]);
	const [disruption, setDisruption] = useState<Disruption>();
	const [equine, setEquine] = useState<Equine>();
	const { fetchingData, collection, error, notFound } = getCollection(
		'disruptions'
	);

	useEffect(() => {
		if (router.isReady) {
			getEquineFromId(router.query.equineId);
			setDisruptions(convertEnumsToDisruptions(collection));
			console.log("equine set to")
			console.log(equine);
		}
	}, [router.isReady]);

	const getEquineFromId = async (id:any) => {     
		console.log("id is " + id);
        await fetch(`${process.env.NEXT_PUBLIC_URL}data/equines/${id}`)
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
		saveData("", `/equines/${equine.id}/disruptions/${disruption?.id}/start`, 'POST');
		router.push('/');
    }

	const convertEnumsToDisruptions = (collection:any) => {
		let disruptionCollection = [];
		collection.forEach(disruptionEnum => {
			const disruption = {} as Disruption;
			disruption.name = disruptionEnum.string;
			disruption.id = disruptionEnum.id; 
			disruptionCollection.push(disruption);	
		});
		return disruptionCollection;
	}

	return (
		<Grid 
			item xs={12} 
			sm={6} 
			>
			<PageContainer>
				<BackBreadcrumb link="/" />
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
