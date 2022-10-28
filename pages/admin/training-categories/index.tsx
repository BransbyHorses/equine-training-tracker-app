import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrainingCategory } from "../../../utils/types";
import AdminPageTitle from "../../../components/pages/admin/AdminPageTitle";
import useTrainingCategories from "../../../utils/hooks/useTrainingCategories";

import LoadingSpinner from "../../../components/LoadingSpinner";
import AdminContentBlock from "../../../components/pages/admin/AdminContentBlock";

const TrainingCategoriesAdminPage = () => {
	const { fetchingData, trainingCategories, error } = useTrainingCategories();
	const [editValue, setEditValue] = useState<TrainingCategory | undefined>(
		undefined
	);
	const [updatedTrainingCategories, setUpdatedTrainingCategories] = useState<
		TrainingCategory[] | []
	>([]);

	useEffect(() => {
		setUpdatedTrainingCategories(trainingCategories);
	}, [trainingCategories]);

	const showEditForm = (id: any) => {
		setEditValue(
			updatedTrainingCategories.find(
				(trainingCategory) => trainingCategory.id === id
			)
		);
	};

	const saveEditedTrainingCategory = (newName: string) => {
		if (newName === editValue!.name) {
			setEditValue(undefined);
		} else {
			const editedTrainingCategory: TrainingCategory = {
				id: editValue!.id,
				name: newName,
			};
			axios
				.put(
					`${process.env.NEXT_PUBLIC_URL}data/training-categories/${editedTrainingCategory.id}`,
					editedTrainingCategory
				)
				.then(({ data }) => {
					setEditValue(undefined);
					const trainingCategories = updatedTrainingCategories.map((tc) => {
						if (tc.id === data.id) return data;
					});
					setUpdatedTrainingCategories(trainingCategories);
				})
				.catch((err) => {});
		}
	};

	const deleteTrainingCategory = (id: any) => {
		axios
			.delete(`${process.env.NEXT_PUBLIC_URL}data/training-categories/${id}`)
			.then(({ data }) => {
				setUpdatedTrainingCategories(
					updatedTrainingCategories.filter((tc) => tc.id != id)
				);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	if (fetchingData) {
		return <LoadingSpinner />;
	}

	return (
		<>
			<AdminPageTitle
				title="Manage Training Categories"
				buttonLink="/admin/training-categories/add"
				contentLength={updatedTrainingCategories.length}
			/>
			{updatedTrainingCategories.map((trainingCategory: TrainingCategory) => {
				return (
					<AdminContentBlock
						key={trainingCategory.id}
						content={trainingCategory}
						editValue={editValue}
						saveFunction={saveEditedTrainingCategory}
						editAction={showEditForm}
						deleteFunction={deleteTrainingCategory}
					/>
				);
			})}
		</>
	);
};

export default TrainingCategoriesAdminPage;
