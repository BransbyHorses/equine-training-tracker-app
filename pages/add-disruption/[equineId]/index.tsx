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


export default function StartTrainingProgramme() {

	const router = useRouter();
	const [disruptions, setDisruptions] = useState<Disruption[]>([]);
	const { fetchingData, collection, error, notFound } = getCollection(
		'disruptions'
	);

	useEffect(() => {
		if (router.isReady) {
			setDisruptions(collection);
		}
	}, [router.isReady]);

	return (
		<Grid 
			item xs={12} 
			sm={6} 
			>
			<PageContainer>
				<BackBreadcrumb link="/" />
				<PageTitle title="Add disruption" />
    
				<RadioButtonsForm
					items={disruptions} 
				/>
	

				<PrimaryButton 
					buttonText="Save" 
					link="/"
				/>

			</PageContainer>
		</Grid>
	);
};
