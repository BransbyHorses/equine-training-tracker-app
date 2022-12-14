import React, { useState } from "react";
import AdminAddPage from "../../../components/pages/admin/AdminAddPage";

const AddTrainingEnvironment: React.FC = () => {
	const [successMessage, setSuccessMessage] = useState<boolean>();
	const [errorMessage, setErrorMessage] = useState<boolean>();

	const saveNewTrainingEnvironment = (newTrainingEnvironment: string) => {
		fetch(`${process.env.NEXT_PUBLIC_URL}/data/environments`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: newTrainingEnvironment }),
		})
			.then((response) => response.json())
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
			entity="Training Environment"
			success={successMessage}
			error={errorMessage}
			saveFunction={saveNewTrainingEnvironment}
		/>
	);
};
export default AddTrainingEnvironment;
