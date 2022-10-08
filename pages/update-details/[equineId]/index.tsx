import React, { useEffect, useState } from "react";
import {
	Breadcrumbs, 
	Container,
	Grid, 
	Link, 
	Typography} from "@mui/material";
import SecondaryButton from '../../../components/SecondaryButton';
import PageTitle from '../../../components/PageTitle';
import PageContainer from "../../../components/PageContainer";



const UpdateDetails = () => {

	return (
		<Container
		sx={{
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
		}}
		>
			<Grid container rowSpacing={3} columnSpacing={3}>
				<Breadcrumbs aria-label="breadcrumb">
					<Link underline="hover" color="inherit" href="/">
						Equines
					</Link>
					<Link underline="hover" color="inherit" href="/">
						Back to equine
					</Link>
					<Typography color="text.primary">Update details</Typography>
				</Breadcrumbs>
				
			<PageTitle title="Update details" />

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
	);
};

export default UpdateDetails;
