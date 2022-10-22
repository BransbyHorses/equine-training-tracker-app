import React, { useEffect, useState } from "react";
import {
	Grid,
    Typography
	} from "@mui/material";
import PageTitle from '../../../components/PageTitle';
import PageContainer from '../../../components/PageContainer';
import PrimaryButton from  '../../../components/PrimaryButton';
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import RadioButtonsForm from "../../../components/RadioButtonsForm";
import { useRouter } from "next/router";
import getCollection from "../../../utils/hooks/getCollection";
import { TrainingCategory } from "../../../utils/types";
import { useEquine } from "../../../utils/hooks/equine";



export default function StartTrainingProgramme() {

	const router = useRouter();
	const [trainingCategories, setTrainingCategories] = useState<TrainingCategory[]>([]);
	const [equineId, setEquineId] = useState<string | undefined>(undefined);
	const [trainingCategory, setTrainingCategory] = useState<TrainingCategory>(trainingCategories[0]);
	const { fetchingData, collection, error, notFound } = getCollection(
		'training-categories'
	);
	const { fetchingEquineData, equine, equineError, equineNotFound } = useEquine(
		router.isReady,
		equineId
	);
	

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query.equineId);
			setTrainingCategories(collection);
		}
	}, [router.isReady]);

	const handleChange = (event:any) => {
		setTrainingProgramme(event.target.value);
		console.log(trainingCategory);	

	}

	const updateEquine = async () => {
	console.log("Adding  " + trainingCategory)
	if (trainingCategory !== undefined) {
	equine?.trainingProgrammes.push(trainingCategory);
	}
	console.log(equine?.trainingProgrammes);
	await fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines/${equineId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(equine),
	})
		.then((response) => response.json())
		.then((data) => router.push(`/`))
		.catch((rejected: any) => {
			console.log(rejected);
		});
    }
	
	return (
		<Grid 
			item xs={12} 
			sm={6} 
			>
			<PageContainer>
				<BackBreadcrumb link="/" />
				<PageTitle title="Start a new training programme" />
    
				<Typography>This will end the current training programme</Typography>
				<RadioButtonsForm
					items={trainingCategories} 
					handleChange={handleChange}

				/>
	

				<PrimaryButton 
					buttonText="Save" 
					link="/"
					handleChange={updateEquine}
				/>

			</PageContainer>
		</Grid>
	);
};
