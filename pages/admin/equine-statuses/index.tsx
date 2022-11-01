import { useEffect, useState } from "react";
import axios from "axios";

import { EquineStatus } from "../../../utils/types";
import AdminPageTitle from "../../../components/pages/admin/AdminPageTitle";
import AdminContentBlock from "../../../components/pages/admin/AdminContentBlock";

const EquineStatusAdminPage: React.FC = (props) => {
	const [equineStatuses, setEquineStatuses] = useState<EquineStatus[]>([]);
	const [editValue, setEditValue] = useState<EquineStatus>();

	function getCategories() {
		fetch(`${process.env.NEXT_PUBLIC_URL}/data/equine-statuses`)
			.then((response) => response.json())
			.then((data) => setEquineStatuses(data))
			.catch((rejected) => {
				console.log(rejected);
			});
	}

	useEffect(() => {
		getCategories();
	}, []);

	const editEquineStatus = (id: any) => {
		console.log(id);
		setEditValue(equineStatuses.find((equineStatus) => equineStatus.id === id));
		console.log(editValue);
	};

	const saveEditedEquineStatus = (newEquineStatus: string) => {
		if (newEquineStatus === editValue!.name) {
			setEditValue(undefined);
			return;
		}

		const editedEquineStatus = { id: editValue!.id, name: newEquineStatus };

		axios
			.put(
				`${process.env.NEXT_PUBLIC_URL}data/skills/${editValue!.id}`,
				editedEquineStatus
			)
			.then(({ data }) => {
				setEditValue(undefined);
				const updatedEquineStatuses = equineStatuses.map((equineStatus) => {
					return equineStatus.id === data.id ? data : equineStatus;
				});
				setEquineStatuses(updatedEquineStatuses);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const deleteEquineStatus = (id: any) => {
		fetch(`${process.env.NEXT_PUBLIC_URL}/data/equine-statuses/${id}`, {
			method: "DELETE",
		})
			.then(() => {
				setEquineStatuses(
					equineStatuses.filter((equineStatus) => equineStatus.id != id)
				);
			})
			.catch((rejected) => {
				console.error(rejected);
			});
	};

	return (
		<>
			<AdminPageTitle
				title="Manage Equine Statuses"
				buttonLink="/admin/equine-statuses/add"
				contentLength={equineStatuses.length}
			/>
			{equineStatuses.map((equineStatus) => {
				return (
					<AdminContentBlock
						key={equineStatus.id}
						editValue={editValue}
						content={equineStatus}
						saveFunction={saveEditedEquineStatus}
						editAction={editEquineStatus}
						deleteFunction={deleteEquineStatus}
					/>
				);
			})}
		</>
	);
};

export default EquineStatusAdminPage;
