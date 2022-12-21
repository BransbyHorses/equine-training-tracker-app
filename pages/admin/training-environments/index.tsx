import { useEffect, useState } from "react";
import axios from "axios";
import { TrainingEnvironment } from "../../../utils/types";
import AdminPageTitle from "../../../components/pages/admin/AdminPageTitle";
import AdminContentBlock from "../../../components/pages/admin/AdminContentBlock";

export default function TrainingEnvironmentsAdminPage() {
	const [environments, setEnvironments] = useState<TrainingEnvironment[]>([]);
	const [editValue, setEditValue] = useState<TrainingEnvironment>();

	function getEnvironments() {
		fetch(`${process.env.NEXT_PUBLIC_URL}/data/environments`)
			.then((response) => response.json())
			.then((data) => setEnvironments(data))
			.catch((rejected) => {
				console.error(rejected);
			});
	}

	useEffect(() => {
		getEnvironments();
	}, []);

	const editTrainingEnvironment = (id: any) => {
		setEditValue(environments.find((environment) => environment.id === id));
	};

	const saveEditedTrainingEnvironment = (newTrainingEnvironment: string) => {
		if (newTrainingEnvironment === editValue!.name) {
			setEditValue(undefined);
			return;
		}
		const updatedTrainingEnvironment: TrainingEnvironment = {
			id: editValue!.id,
			name: newTrainingEnvironment,
		};
		axios
			.patch(
				`${process.env.NEXT_PUBLIC_URL}/data/environments/${editValue!.id}`,
				updatedTrainingEnvironment
			)
			.then(({ data }) => {
				setEditValue(undefined);
				const updatedTrainingEnvironments = environments.map((environment) => {
					return environment.id === data.id ? data : environment;
				});
				setEnvironments(updatedTrainingEnvironments);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const deleteTrainingEnvironment = (id: any) => {
		fetch(`${process.env.NEXT_PUBLIC_URL}/data/environments/${id}`, {
			method: "DELETE",
		})
			.then(() => {
				setEnvironments(
					environments.filter((environment) => environment.id != id)
				);
			})
			.catch((rejected) => {
				console.error(rejected);
			});
	};

	return (
		<>
			<AdminPageTitle
				title="Manage Training Environments"
				buttonLink="/admin/training-environments/add"
				contentLength={environments.length}
			/>
			{environments.map((environment) => {
				return (
					<AdminContentBlock
						key={environment.id}
						content={environment}
						editValue={editValue}
						editAction={editTrainingEnvironment}
						saveFunction={saveEditedTrainingEnvironment}
						deleteFunction={deleteTrainingEnvironment}
					/>
				);
			})}
		</>
	);
}
