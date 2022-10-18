import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import PageTitle from '../../../components/PageTitle';
import PageContainer from '../../../components/PageContainer';
import PrimaryButton from  '../../../components/PrimaryButton';
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import RadioButtonsForm from "../../../components/RadioButtonsForm";
import { useRouter } from "next/router";
import getCollection from "../../../utils/hooks/getCollection";
import { Disruption } from "../../../utils/types";


export default function EndTraining() {

	const router = useRouter();
	const [endConditions, setEndConditions] = useState<Disruption[]>([]);
	const { fetchingData, collection, error, notFound } = getCollection(
		'disruptions'
	);

	useEffect(() => {
		if (router.isReady) {
			setEndConditions(collection);
		}
	}, [router.isReady]);

	return (
		<Grid 
			item xs={12} 
			sm={6} 
			>
			<PageContainer>
				<BackBreadcrumb link="/" />
				<PageTitle title="Reason for ending training" />
    
				<RadioButtonsForm
					items={endConditions} 
				/>
	

				<PrimaryButton 
					buttonText="Save" 
					link="/"
				/>

			</PageContainer>
		</Grid>
	);
};
