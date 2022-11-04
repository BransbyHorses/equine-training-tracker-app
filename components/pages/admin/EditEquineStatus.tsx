import React, { useState } from "react";
import axios from "axios";
import { EquineStatus } from "../../../utils/types";
import PageTitle from "../../PageTitle";
import ResponsiveButton from "../../ResponsiveButton";
import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Box,
} from "@mui/material";
import { useRouter } from "next/router";

const endTrainingOptions = [
	{
		string: "Returned to owner",
		id: 3,
		categorisedAsTraining: true,
	},
	{
		string: "Rehomed",
		id: 4,
		categorisedAsTraining: true,
	},
	{
		string: "Euthanised",
		id: 5,
		categorisedAsTraining: true,
	},
	{
		string: "Other",
		id: 6,
		categorisedAsTraining: true,
	},
];

const EditEquineStatus = ({
	equineId,
	currentStatus,
}: {
	equineId: string;
	currentStatus?: EquineStatus;
}) => {
	const router = useRouter();
	const [equineStatusId, setEquineStatusId] = useState("");

	const setEquineStatusToEndTraining = () => {
		console.log(equineStatusId);
		if (equineStatusId === "") return;
		axios
			.patch(
				`${process.env.NEXT_PUBLIC_URL}data/equines/${equineId}/equine-status/${equineStatusId}`
			)
			.then(() => {
				router.push(`/admin/equines/${equineId}`);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<>
			<PageTitle title="End Training Permanently" />
			<FormControl>
				<RadioGroup
					name="end-training-options"
					onChange={(e) => setEquineStatusId(e.target.value)}
				>
					{endTrainingOptions.map((endTrainingOption) => {
						return (
							<FormControlLabel
								key={endTrainingOption.id}
								value={endTrainingOption.id}
								control={<Radio />}
								label={endTrainingOption.string}
								disabled={
									currentStatus && currentStatus.id === endTrainingOption.id
								}
							/>
						);
					})}
				</RadioGroup>
			</FormControl>
			<Box>
				<ResponsiveButton
					desktopstyles={{ width: "20%", mt: 3 }}
					onClick={setEquineStatusToEndTraining}
				>
					Save
				</ResponsiveButton>
			</Box>
		</>
	);
};

export default EditEquineStatus;
