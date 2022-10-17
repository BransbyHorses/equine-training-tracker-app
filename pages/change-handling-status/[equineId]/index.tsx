import React, { useEffect, useState } from "react";
import {Select} from "@mui/material";
import PageTitle from '../../../components/PageTitle';
import PageContainer from '../../../components/PageContainer';
import PrimaryButton from  '../../../components/PrimaryButton';
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import { useRouter } from "next/router";
import { useTrainingCategories } from "../../../utils/hooks/training-category";
import { TrainingCategory } from "../../../utils/types";



export default function ChangeHandlingStatus() {

	const router = useRouter();
	const [categories, setCategories] = useState<TrainingCategory[]>([]);
	const { fetchingData, trainingCategories, error, notFound } = useTrainingCategories(
		router.isReady
	);

	useEffect(() => {
		if (router.isReady) {
			setCategories(trainingCategories);
		}
	}, [router.isReady]);

	return (
		<>
			<PageContainer>
				<BackBreadcrumb link="/" />
				<PageTitle title="Change handling status" />

				<Select>

				</Select>
    
				

				<PrimaryButton buttonText="Save" link="/"/>

			</PageContainer>
		</>
	);
};
