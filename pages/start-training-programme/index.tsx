import React, { useEffect, useState } from "react";
import {
	Container,
	Grid, 
	} from "@mui/material";
import SecondaryButton from '../../../components/SecondaryButton';
import PageTitle from '../../../components/PageTitle';
import BackBreadcrumb from "../../../components/BackBreadcrumb";



export default function UpdateDetails() {

	return (
		<>
			<BackBreadcrumb link="/" />
			<Container>
				<PageTitle title="Start training programme" />
			</Container>
		</>
	);
};
