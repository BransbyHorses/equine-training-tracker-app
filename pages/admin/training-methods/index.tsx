import { useEffect, useState } from "react";
import axios from "axios";
import { TrainingMethod } from "../../../utils/types";
import AdminPageTitle from "../../../components/pages/admin/AdminPageTitle";
import AdminContentBlock from "../../../components/pages/admin/AdminContentBlock";

export default function TrainingMethods() {
	const [trainingMethods, setTrainingMethods] = useState<TrainingMethod[]>([]);
	const [editValue, setEditValue] = useState<TrainingMethod>();

	function getTrainingMethods() {
		fetch(`${process.env.NEXT_PUBLIC_URL}/data/training-methods`)
			.then((response) => response.json())
			.then((data) => setTrainingMethods(data))
			.catch((rejected) => {
				console.error(rejected);
			});
	}

	useEffect(() => {
		getTrainingMethods();
	}, []);

	const editTrainingMethod = (id: any) => {
		setEditValue(
			trainingMethods.find((trainingMethod) => trainingMethod.id === id)
		);
	};

	const saveEditedTrainingMethod = (newTrainingMethod: string) => {
		if (newTrainingMethod === editValue!.name) {
			setEditValue(undefined);
			return;
		}

		const saveEditedTrainingMethod = {
			id: editValue!.id,
			name: newTrainingMethod,
		};

		axios
			.put(
				`${process.env.NEXT_PUBLIC_URL}data/training-methods/${editValue!.id}`,
				saveEditedTrainingMethod
			)
			.then(({ data }) => {
				setEditValue(undefined);
				const updatedTrainingMethods = trainingMethods.map((trainingMethod) => {
					return trainingMethod.id === data.id ? data : trainingMethod;
				});
				setTrainingMethods(updatedTrainingMethods);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const deleteTrainingMethod = (id: any) => {
		fetch(`${process.env.NEXT_PUBLIC_URL}/data/training-methods/${id}`, {
			method: "DELETE",
		})
			.then(() => {
				setTrainingMethods(
					trainingMethods.filter((trainingMethod) => trainingMethod.id != id)
				);
			})
			.catch((rejected) => {
				console.error(rejected);
			});
	};

	return (
		<>
			<AdminPageTitle
				title="Manage Training Methods"
				buttonLink="/admin/training-methods/add-training-method"
				contentLength={trainingMethods.length}
			/>
			{trainingMethods.map((trainingMethod) => {
				return (
					<AdminContentBlock
						key={trainingMethod.id}
						content={trainingMethod}
						editValue={editValue}
						editAction={editTrainingMethod}
						saveFunction={saveEditedTrainingMethod}
						deleteFunction={deleteTrainingMethod}
					/>
				);
			})}
		</>
	);
}
