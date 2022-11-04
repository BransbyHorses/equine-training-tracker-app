import React, { useState } from "react";
import AdminAddPage from "../../../components/pages/admin/AdminAddPage";

const AddNewEquineStatusPage: React.FC = (props) => {
	const [successMessage, setSuccessMessage] = useState<boolean>();
	const [errorMessage, setErrorMessage] = useState<boolean>();

	const saveEquineStatus = (newEquineStatus: any) => {
		fetch(`${process.env.NEXT_PUBLIC_URL}/data/equine-statuses`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: newEquineStatus }),
		})
			.then((response) => {
				response.json();
			})
			.then((data) => {
				setSuccessMessage(true);
				setTimeout(() => {
					setSuccessMessage(false);
				}, 2000);
			})
			.catch((rejected) => {
				console.error(rejected);
				setErrorMessage(true);
				setTimeout(() => {
					setErrorMessage(false);
				}, 2000);
			});
	};

	return (
		<AdminAddPage
			entity="Equine Status"
			success={successMessage}
			error={errorMessage}
			saveFunction={saveEquineStatus}
		/>
	);
};
export default AddNewEquineStatusPage;
