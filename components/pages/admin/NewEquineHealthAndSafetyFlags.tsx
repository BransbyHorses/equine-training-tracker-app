import React from "react";
import { Equine } from "../../../utils/types";
import { Button, Container, Typography, useTheme, Box } from "@mui/material";
import EquineHealthAndSafety from "../equines/health-and-safety/EquineHealthAndSafety";
import { useRouter } from "next/router";
import ResponsiveButton from "../../ResponsiveButton";

const NewEquineHealthAndSafetyFlags = ({ equine }: { equine: Equine }) => {
	const router = useRouter();
	const theme = useTheme();

	return (
		<>
			<Typography variant="h5" color="textSecondary" sx={{ mb: "1.5rem" }}>
				Add health & safety flags for {equine.name}
			</Typography>
			<EquineHealthAndSafety
				equineId={equine.id.toString()}
				healthAndSafetyFlags={[]}
			/>
			<ResponsiveButton
				desktopStyles={{
					mt: 3,
					width: "20%",
				}}
				onClick={() => router.push(`/admin/equines/${equine.id}`)}
			>
				Finish & go to profile
			</ResponsiveButton>
		</>
	);
};

export default NewEquineHealthAndSafetyFlags;
