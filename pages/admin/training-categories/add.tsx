import React, { useState } from "react";
import axios from "axios";
import AdminAddPage from "../../../components/pages/admin/AdminAddPage";

const AddTrainingCategoryPage = () => {
	const [successMessage, setSuccessMessage] = useState<boolean>();
	const [errorMessage, setErrorMessage] = useState<boolean>();

	const saveFunction = (trainingCategory: string) => {
		axios
			.post(`${process.env.NEXT_PUBLIC_URL}/data/training-categories`, {
				name: trainingCategory,
			})
			.then(() => {
				setSuccessMessage(true);
				setTimeout(() => {
					setSuccessMessage(false);
				}, 2000);
			})
			.catch((err) => {
				console.error(err);
				setErrorMessage(true);
				setTimeout(() => {
					setErrorMessage(false);
				}, 2000);
			});
	};

	return (
		<AdminAddPage
			entity="Training Category"
			success={successMessage}
			error={errorMessage}
			saveFunction={saveFunction}
		/>
	);
};

export default AddTrainingCategoryPage;
