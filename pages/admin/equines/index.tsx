import EquineListGrid from "../../../components/EquineListGrid";
import AdminPageTitle from "../../../components/pages/admin/AdminPageTitle";
import AutoCompleteBox from "../../../components/AutoCompleteBox";
import { useEquines } from "../../../utils/hooks/equine";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { Box, Alert } from "@mui/material";

export default function Equines() {
	const { fetchingData, equines, error } = useEquines();

	if (fetchingData) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<LoadingSpinner />
			</Box>
		);
	}

	if (error) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Alert severity="error">An unexpected error occurred</Alert>
			</Box>
		);
	}

	return (
		<>
			<AdminPageTitle
				title="Manage Equines"
				buttonLink="/admin/equines/add-equine"
				contentLength={equines.length}
			/>
			<AutoCompleteBox
				options={equines.map((equine) => {
					return { optionName: equine.name, optionId: equine.id };
				})}
				label="Search equines"
				linkName="equines"
			/>
			<Box mb={2} />
			{equines.length > 0 && <EquineListGrid equines={equines} />}
		</>
	);
}
