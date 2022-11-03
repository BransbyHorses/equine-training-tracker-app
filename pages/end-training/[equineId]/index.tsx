import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import PageTitle from '../../../components/PageTitle';
import PageContainer from '../../../components/PageContainer';
import PrimaryButton from  '../../../components/PrimaryButton';
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import LoadingSpinner  from "../../../components/LoadingSpinner";
import RadioButtonsForm from "../../../components/RadioButtonsForm";
import { useRouter } from "next/router";
import getCollection from "../../../utils/hooks/getCollection";
import { Status } from "../../../utils/types";
import { convertEnumStringKeyToName, saveData } from "../../../utils/helpers";



export default function EndTraining() {

	const router = useRouter();
	const [equineStatuses, setEquineStatuses] = useState<Status[]>([]);
	const [equineStatus, setEquineStatus] = useState<Status | undefined>(undefined);
	const { fetchingData, collection, error } = getCollection(
		'equine-statuses'
	);
	console.log("State is");
	console.log(equineStatuses);


	useEffect(() => {
		if (router.isReady) {
			console.log("Collection is");
			console.log(collection);
			collection.forEach(convertEnumStringKeyToName)
			setEquineStatuses(collection);
		}
	}, [router.isReady]);

	

	const handleChange = (event:any) => {
		console.log(event.target.value);
		let updatedStatus = equineStatuses.find(status => event.target.value == status.id);
		setEquineStatus(updatedStatus);
		console.log(equineStatus);
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
				<PageTitle title="End training permanently" />
    
				<RadioButtonsForm
					items={equineStatuses} 
					handleChange={handleChange}
				/>
	

				<PrimaryButton 
					buttonText="Save" 
					link="/"
				/>

			</PageContainer>
		</Grid>
	);
};
