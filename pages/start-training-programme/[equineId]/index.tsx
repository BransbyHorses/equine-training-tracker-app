import React, { useEffect, useState } from "react";
import {
	Box,
	Grid,
    Typography
	} from "@mui/material";
import PageTitle from '../../../components/PageTitle';
import PageContainer from '../../../components/PageContainer';
import PrimaryButton from  '../../../components/PrimaryButton';
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import RadioButtonsForm from "../../../components/RadioButtonsForm";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useRouter } from "next/router";
import getCollection from "../../../utils/hooks/getCollection";
import { TrainingCategory, TrainingProgramme } from "../../../utils/types";
import { useEquine } from "../../../utils/hooks/equine";
import { saveData } from "../../../utils/helpers";




export default function StartTrainingProgramme() {

	const router = useRouter();
	const [trainingCategories, setTrainingCategories] = useState<TrainingCategory[]>([]);
	const [equineId, setEquineId] = useState<string | undefined>(undefined);
	const [trainingCategory, setTrainingCategory] = useState<TrainingCategory | undefined>(undefined);
	const {fetchingData, collection } = getCollection(
		'training-categories'
	);
	const { equine } = useEquine(
		router.isReady,
		equineId
	);
	

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query.equineId as string);
			setTrainingCategories(collection);
		}
	}, [router.isReady]);

	const handleChange = (event:any) => {
		let updatedTrainingCategory = trainingCategories.find(category => event.target.value == category.name);
		setTrainingCategory(updatedTrainingCategory);
	}

	const updateTrainingProgramme = async () => {
		saveData("", `training-programmes/${trainingCategory?.id}/equine/${equine?.id}`, 'POST');
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
				<BackBreadcrumb />
				<PageTitle title="Start a new training programme" />
    
				<Typography>This will end the current training programme</Typography>
				<RadioButtonsForm
					items={trainingCategories} 
					handleChange={handleChange}

				/>
	

				<PrimaryButton 
					buttonText="Save" 
					link="/"
					handleChange={updateTrainingProgramme}
				/>

			</PageContainer>
		</Grid>
	);
};
