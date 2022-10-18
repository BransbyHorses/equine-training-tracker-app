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
import { useRouter } from "next/router";
import { useTrainingCategories } from "../../../utils/hooks/training-category";
import { TrainingCategory } from "../../../utils/types";


export default function StartTrainingProgramme() {

	const router = useRouter();
	const [categories, setCategories] = useState<TrainingCategory[]>([]);
	const { fetchingData, trainingCategories, error, notFound } = useTrainingCategories(
		router.isReady
	);

	useEffect(() => {
		if (router.isReady) {
			setCategories(trainingCategories);
		}
	}, [router.isReady]);

	return (
		<Grid 
			item xs={12} 
			sm={6} 
			>
			<PageContainer>
				<BackBreadcrumb link="/" />
				<PageTitle title="Start a new training programme" />
    
				<Typography>This will end the current training programme</Typography>
				<FormControl>
					<RadioGroup
						defaultValue="Training"
						name="radio-buttons-group"
					>
						{categories.map(({id, name}) => {
							return (
						<FormControlLabel key={id} value={name} control={<Radio />} label={name} />
							)
						}
						)
					}
					</RadioGroup>
				</FormControl>

				<PrimaryButton 
					buttonText="Save" 
					link="/"
				/>

			</PageContainer>
		</Grid>
	);
};