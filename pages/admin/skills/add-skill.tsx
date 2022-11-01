import React, { useState } from "react";
import AdminAddPage from "../../../components/pages/admin/AdminAddPage";

const AddNewSkillPage: React.FC = (props) => {
	const [successMessage, setSuccessMessage] = useState<boolean>();
	const [errorMessage, setErrorMessage] = useState<boolean>();

	const submitSkill = (newSkill: any) => {
		fetch(`${process.env.NEXT_PUBLIC_URL}/data/yards`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: newSkill }),
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
			entity="Skill"
			success={successMessage}
			error={errorMessage}
			saveFunction={submitSkill}
		/>
	);
};
export default AddNewSkillPage;
