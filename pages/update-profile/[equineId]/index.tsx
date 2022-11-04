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



export default function UpdateProfile() {

	const router = useRouter();
	const [equineId, setEquineId] = useState<string | undefined>(undefined);
	
	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query.equineId as string);
		}
	}, [router.isReady]);

	return (
		<>
			<PageContainer>
				<BackBreadcrumb />
				<PageTitle title="Update profile" />
				<Grid container rowSpacing={3} columnSpacing={3}>
					<SecondaryButton 
						buttonText="Start training programme"
						link={`/start-training-programme/${equineId}`}
					/>
					<SecondaryButton 
						buttonText="Change handling status"
						link={`/change-handling-status/${equineId}`}
						/>
					<SecondaryButton 
						buttonText="Add disruption"
						link={`/add-disruption/${equineId}`}

					/>
					<SecondaryButton 
						buttonText="End training permanently"
						link={`/end-training/${equineId}`}

					/>
				</Grid>
				</PageContainer>
		</>
	);
};
