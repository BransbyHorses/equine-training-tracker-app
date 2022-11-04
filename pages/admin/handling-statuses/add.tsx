import React, { useState } from "react";
import AdminAddPage from "../../../components/pages/admin/AdminAddPage";

const AddLearnerTypes: React.FC = (props) => {
	const [successMessage, setSuccessMessage] = useState<boolean>();
	const [errorMessage, setErrorMessage] = useState<boolean>();

	const saveLearnerType = (name: string) => {
		fetch(`${process.env.NEXT_PUBLIC_URL}/data/learner-types`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name }),
		})
			.then((response) => response.json())
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
			entity="Handling Status"
			saveFunction={saveLearnerType}
			success={successMessage}
			error={errorMessage}
		/>
	);
};
export default AddLearnerTypes;
