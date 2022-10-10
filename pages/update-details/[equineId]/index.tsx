import React, { useEffect, useState } from "react";
import {
	Container,
	Grid, 
	} from "@mui/material";
import SecondaryButton from '../../../components/SecondaryButton';
import PageTitle from '../../../components/PageTitle';
import BackBreadcrumb from "../../../components/BackBreadcrumb";



const UpdateDetails = () => {

	return (
		<>
			<BackBreadcrumb link="/" />
			<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
			>
				
				<PageTitle title="Update details" />
				<Grid container rowSpacing={3} columnSpacing={3}>
					<SecondaryButton 
						buttonText="Start training programme"
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
			</Container>
		</>
	);
};

export default UpdateDetails;
