import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BackBreadcrumb from "../../../../components/BackBreadcrumb";
import ChangeTrainingProgramme from "../../../../components/pages/admin/ChangeTrainingProgramme";
import EditEquineYard from "../../../../components/pages/admin/editEquineYard";
import EditHandlingStatus from "../../../../components/pages/admin/EditHandlingStatus";
import { useEquine } from "../../../../utils/hooks/equine";
import { findCurrentTrainingProgramme } from "../../../../utils/helpers";

const EditWrapper = (props: any) => {
	return (
		<>
			<BackBreadcrumb />
			<Box mt={2}>{props.children}</Box>
		</>
	);
};

const EditEquinePage = () => {
	const router = useRouter();
	const [editValue, setEditValue] = useState<string | undefined>(undefined);
	const [equineId, setEquineId] = useState<string | undefined>(undefined);
	const { fetchingData, equine, error, notFound } = useEquine(
		router.isReady,
		equineId
	);

	const currentTrainingProgramme = findCurrentTrainingProgramme(
		equine?.trainingProgrammes
	);

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query.id as string);
		}
	}, [router.isReady]);

	useEffect(() => {
		if (router.query["value"]) {
			setEditValue(router.query["value"] as string);
		}
	}, [router]);

	switch (editValue) {
		case "yard":
			return (
				<EditWrapper>
					<EditEquineYard
						equineId={equineId!}
						currentYard={equine && equine.yard ? equine.yard : undefined}
					/>
				</EditWrapper>
			);
		case "handlingStatus":
			return (
				<EditWrapper>
					<EditHandlingStatus
						equineId={equineId!}
						currentStatus={
							equine && equine.learnerType ? equine.learnerType : undefined
						}
					/>
				</EditWrapper>
			);
		case "trainingProgramme":
			return (
				<EditWrapper>
					<ChangeTrainingProgramme
						equineId={equineId!}
						currentTrainingCategory={
							currentTrainingProgramme
								? currentTrainingProgramme.trainingCategory
								: undefined
						}
					/>
				</EditWrapper>
			);
	}
};

export default EditEquinePage;
