import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import PageTitle from "../../../components/PageTitle";
import PageContainer from "../../../components/PageContainer";
import PrimaryButton from "../../../components/PrimaryButton";
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import RadioButtonsForm from "../../../components/RadioButtonsForm";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useRouter } from "next/router";
import getCollection from "../../../utils/hooks/getCollection";
import { TrainingCategory, TrainingProgramme } from "../../../utils/types";
import { useEquine } from "../../../utils/hooks/equine";
import { saveData } from "../../../utils/helpers";
import ResponsiveButton from "../../../components/ResponsiveButton";

export default function StartTrainingProgramme() {
	const router = useRouter();
	const [trainingCategories, setTrainingCategories] = useState<
		TrainingCategory[]
	>([]);
	const [equineId, setEquineId] = useState<string | undefined>(undefined);
	const [trainingCategoryId, setTrainingCategoryId] = useState<number>();

	const { fetchingData, collection } = getCollection("training-categories");
	const { equine } = useEquine(router.isReady, equineId);

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query.equineId as string);
			setTrainingCategories(collection);
		}
	}, [router.isReady]);

	const handleChange = (event: any) => {
		setTrainingCategoryId(event.target.value);
	};

	const updateTrainingProgramme = async () => {
		saveData(
			"",
			`training-programmes/${trainingCategoryId}/equine/${equine?.id}`,
			"POST"
		);
		router.push(`/equines/${equine?.id}`);
	};

	if (fetchingData) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<LoadingSpinner />
			</Box>
		);
	}

	return (
		<>
			<BackBreadcrumb />
			<PageTitle title="Start a new training programme" />

			<Typography sx={{ mb: 2 }} color="gray">
				This will end the current training programme
			</Typography>
			<RadioButtonsForm
				items={trainingCategories}
				handleChange={handleChange}
			/>
			<Box>
				<ResponsiveButton
					onClick={updateTrainingProgramme}
					desktopstyles={{ width: "20%", mt: 3 }}
				>
					Save
				</ResponsiveButton>
			</Box>
		</>
	);
}
