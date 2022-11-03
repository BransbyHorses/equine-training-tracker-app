import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import PageTitle from '../../../components/PageTitle';
import PageContainer from '../../../components/PageContainer';
import PrimaryButton from  '../../../components/PrimaryButton';
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import RadioButtonsForm from "../../../components/RadioButtonsForm";
import { useRouter } from "next/router";
import getCollection from "../../../utils/hooks/getCollection";


export default function EndTraining() {
	const Status = [
		{"id": "1", "name":"Presented to rehoming scheme"},
		{"id": "2", "name":"Euthanasia"},
		{"id": "3", "name":"Returned to Owner"},
		{"id": "6", "name":"Other"},
	]

	const router = useRouter();
	const [statuses, setStatuses] = useState<[]>(Status);
	const [status, setStatus] = useState<{}>({})

	useEffect(() => {
		if (router.isReady) {
			console.log(Status);
			//setEndConditions(collection);
		}
	}, [router.isReady]);

	const handleChange = (event:any) => {
		let updatedStatus = statuses.find(status => event.target.value == status.name);
		console.log(updatedStatus);
		setStatus(updatedStatus);
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
					handleChange={handleChange}
					items={statuses} 
				/>
	

				<PrimaryButton 
					buttonText="Save" 
					link="/"
				/>

			</PageContainer>
		</Grid>
	);
};
