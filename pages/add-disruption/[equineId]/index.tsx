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


export default function AddDisruption() {

	const router = useRouter();
	const [disruptions, setDisruptions] = useState<Disruption[]>([]);
	const { fetchingData, collection, error, notFound } = getCollection(
		'disruptions'
	);

	useEffect(() => {
		if (router.isReady) {
			setDisruptions(convertEnumsToDisruptions(collection));
		}
	}, [router.isReady]);

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
