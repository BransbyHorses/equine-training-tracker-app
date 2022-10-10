import React, { useEffect, useState } from "react";
import {
	Container,
	Grid, 
	} from "@mui/material";
import SecondaryButton from '../../../components/SecondaryButton';
import PageTitle from '../../../components/PageTitle';
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import PageContainer from "../../../components/PageContainer";
import { useRouter } from "next/router";
import { useEquine } from "../../../utils/hooks/equine";



export default function UpdateDetails() {

	const router = useRouter();
	const [equineId, setEquineId] = useState<string | undefined>(undefined);
	
	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query.equineId);
		}
	}, [router.isReady]);

	return (
		<>
			<PageContainer>
				<BackBreadcrumb link="/" />
				<PageTitle title="Update details" />
				<Grid container rowSpacing={3} columnSpacing={3}>
					<SecondaryButton 
						buttonText="Start training programme"
						link={`/start-training-programme/${equineId}`}
					/>
					<SecondaryButton 
						buttonText="Change type of learner"
					/>
					<SecondaryButton 
						buttonText="Add disruption"
					/>
					<SecondaryButton 
						buttonText="End training"
					/>
				</Grid>
				</PageContainer>
		</>
	);
};
