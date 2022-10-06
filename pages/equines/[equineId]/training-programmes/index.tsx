import React from "react";
import { Breadcrumbs, Link } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useRouter } from "next/router";

const EquineTrainingProgrammes = () => {
	const router = useRouter();
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

export default EquineTrainingProgrammes;
