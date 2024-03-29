import React, { useState } from "react";
import AdminAddPage from "../../../components/pages/admin/AdminAddPage";

const AddNewTrainingMethodPage: React.FC = () => {
	const [successMessage, setSuccessMessage] = useState<boolean>();
	const [errorMessage, setErrorMessage] = useState<boolean>();

	const submitTrainingMethod = (newTrainingMethod: any) => {
		fetch(`${process.env.NEXT_PUBLIC_URL}/data/training-methods`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: newTrainingMethod }),
		})
			.then((response) => {
				response.json();
			})
			.then(() => {
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
			entity="Training Method"
			success={successMessage}
			error={errorMessage}
			saveFunction={submitTrainingMethod}
		/>
	);
};

export default AddNewTrainingMethodPage;
