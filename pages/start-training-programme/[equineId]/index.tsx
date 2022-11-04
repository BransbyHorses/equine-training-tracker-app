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
import useTrainingCategories from "../../../utils/hooks/useTrainingCategories";
import { TrainingCategory, TrainingProgramme } from "../../../utils/types";
import { useEquine } from "../../../utils/hooks/equine";
import { saveData } from "../../../utils/helpers";




export default function StartTrainingProgramme() {

	const router = useRouter();
	const [equineId, setEquineId] = useState<string | undefined>(undefined);
	const [trainingCategoryId, setTrainingCategoryId] = useState<number>();

	const {fetchingData, trainingCategories, error } = useTrainingCategories();
	const { equine } = useEquine(
		router.isReady,
		equineId
	);
	

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query.equineId as string);
		}
	}, [router.isReady]);

	const handleChange = (event:any) => {
		setTrainingCategoryId(event.target.value);
	}

	const updateTrainingProgramme = async () => {
		saveData("", `training-programmes/${trainingCategoryId}/equine/${equine?.id}`, 'POST');
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
			<>
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

			</>
	);
};
