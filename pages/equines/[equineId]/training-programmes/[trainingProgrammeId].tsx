import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Breadcrumbs, Link } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useTrainingProgramme } from "../../../../utils/hooks/trainingProgrammes";

const TrainingProgrammePage = () => {
	const router = useRouter();
	const [trainingProgrammeId, settrainingProgrammeId] = useState<
		string | undefined
	>(undefined);
	const { fetchingData, trainingProgramme, error } =
		useTrainingProgramme(trainingProgrammeId);

	useEffect(() => {
		if (router.isReady) {
			settrainingProgrammeId(router.query["trainingProgrammeId"]);
		}
	}, [router.isReady]);

	return (
		<>
			<Breadcrumbs>
				<Link
					underline="hover"
					color="inherit"
					sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
					onClick={() => router.back()}
				>
					<ArrowLeftIcon /> Back
				</Link>
			</Breadcrumbs>
		</>
	);
};

export default TrainingProgrammePage;
