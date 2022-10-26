import React from "react";
import { Equine } from "../../../utils/types";
import { Button, Container, Typography, useTheme, Box } from "@mui/material";
import EquineHealthAndSafety from "../equines/health-and-safety/EquineHealthAndSafety";
import { useRouter } from "next/router";

const NewEquineHealthAndSafetyFlags = ({
	equine,
}: {
	equine: Equine;
}) => {
	const router = useRouter();
	const theme = useTheme();

	return (
		<Container>
			<Typography variant="h5" color="textSecondary" sx={{ mb: "1.5rem" }}>
				Add Health & Safety Flags for {equine.name}
			</Typography>
			<EquineHealthAndSafety
				equineId={equine.id.toString()}
				healthAndSafetyFlags={[]}
			/>
			<Box mt={4}>
				<Button
					sx={{
						[theme.breakpoints.between("xs", "md")]: {
							width: "100%",
						},
					}}
					variant="contained"
					onClick={() => router.push(`/admin/equines/${equine.id}`)}
				>
					Finish & go to profile
				</Button>
			</Box>
		</Container>
	);
};

export default NewEquineHealthAndSafetyFlags;
