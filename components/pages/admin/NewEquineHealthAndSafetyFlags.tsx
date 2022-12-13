import React from "react";
import { Equine } from "../../../utils/types";
import { Typography } from "@mui/material";
import EquineHealthAndSafety from "../equines/health-and-safety/EquineHealthAndSafety";
import { useRouter } from "next/router";
import ResponsiveButton from "../../ResponsiveButton";

const NewEquineHealthAndSafetyFlags = ({ equine }: { equine: Equine }) => {
	const router = useRouter();

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
				desktopstyles={{
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
