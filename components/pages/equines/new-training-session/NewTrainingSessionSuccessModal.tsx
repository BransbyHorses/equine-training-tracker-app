import * as React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { NewSkillTrainingSessionType } from "../../../../utils/reducers/trainingSessionReducer";
import { useNewSkillTrainingSession } from "../../../../utils/reducers/trainingSessionReducer";

import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import LoadingSpinner from "../../../LoadingSpinner";

const NewTrainingSessionSuccessModal = ({
	isSubmitting,
	success,
}: {
	isSubmitting: boolean;
	success: boolean;
}) => {
	const theme = useTheme();
	const router = useRouter();
	const { dispatch } = useNewSkillTrainingSession();

	return (
		<Modal
			open={isSubmitting || success}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			{isSubmitting ? (
				<Box
					sx={{
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<LoadingSpinner />
				</Box>
			) : (
				<Box
					sx={{
						p: 4,
						width: "75%",
						height: "300px",
						position: "absolute" as "absolute",
						display: "flex",
						flexDirection: "column",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						bgcolor: "background.paper",
						boxShadow: 24,
						[theme.breakpoints.between("md", "xl")]: {
							width: "40%",
						},
					}}
				>
					<Image
						src="/assets/circle-check-solid.svg"
						width="100%"
						height="100%"
					/>
					<Typography variant="h5" color="gray" sx={{ my: 2, mx: "auto" }}>
						Training added
					</Typography>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}
					>
						<Button
							variant="contained"
							sx={{ mb: 2 }}
							onClick={() =>
								router.push(`/equines/${router.query["equineId"]}`)
							}
						>
							return to equine profile
						</Button>
						<Button
							variant="outlined"
							onClick={() =>
								dispatch({ type: NewSkillTrainingSessionType.RESET })
							}
						>
							Add another training session
						</Button>
					</Box>
				</Box>
			)}
		</Modal>
	);
};

export default NewTrainingSessionSuccessModal;
