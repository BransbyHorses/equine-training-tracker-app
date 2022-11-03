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
	const [equineId, setEquineId] = useState<string | undefined>(undefined);
	const [equineStatusId, setEquineStatusId] = useState<Status | undefined>(undefined);
	const { fetchingData, collection, error } = getCollection(
		'equine-statuses'
	);
	console.log("State is");
	console.log(equineStatusId);



	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query.equineId as string);
			collection.forEach(convertEnumStringKeyToName)
			setEquineStatuses(collection.filter(item => !item.inTraining));
		}
	}, [router.isReady]);

	const handleChange = (event:any) => {
		setEquineStatusId(event.target.value);
	}

	const updateStatus = async () => {
		saveData("", `equines/${equineId}/equine-status/${equineStatusId}`, 'PATCH');
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
				<PageTitle title="End training permanently" />
    
				<RadioButtonsForm
					items={equineStatuses.filter(status => !status.categorisedAsTraining)} 
					handleChange={handleChange}
				/>
	

				<PrimaryButton 
					handleChange={updateStatus}
					buttonText="Save" 
					link="/"
				/>

			</PageContainer>
		</Grid>
	);
};
