import Link from "next/link";
import axios from "axios";
import { Typography, Container, Grid, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import LinkButton from "../../../components/LinkButton";
import EntityCard from "../../../components/EntityCard";
import AutoCompleteBox from "../../../components/AutoCompleteBox";
import PageTitle from "../../../components/PageTitle";
import { Yard } from "../../../utils/types";
import AdminPageTitle from "../../../components/pages/admin/AdminPageTitle";
import AdminContentBlock from "../../../components/pages/admin/AdminContentBlock";

export default function YardsAdminPage() {
	const [yards, setYards] = useState<Yard[] | []>([]);
	const [editValue, setEditValue] = useState<Yard>();

	function getYards() {
		fetch(`${process.env.NEXT_PUBLIC_URL}/data/yards`)
			.then((response) => response.json())
			.then((data) => setYards(data))
			.catch((rejected) => {
				console.log(rejected);
			});
	}

	useEffect(() => {
		getYards();
	}, []);

	const showEditForm = (id: any) => {
		setEditValue(yards.find((yard) => yard.id === id));
	};

	const saveEditedYard = (newYardName: string) => {
		if (newYardName === editValue!.name) {
			setEditValue(undefined);
			return;
		}
		const updatedYard: Yard = {
			id: editValue!.id,
			name: newYardName,
		};
		axios
			.put(
				`${process.env.NEXT_PUBLIC_URL}data/yards/${editValue!.id}`,
				updatedYard
			)
			.then(({ data }) => {
				setEditValue(undefined);
				const updatedYards = yards.map((yard) => {
					return yard.id === data.id ? data : yard;
				});
				setYards(updatedYards);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const deleteYard = async (id: any) => {
		await fetch(`${process.env.NEXT_PUBLIC_URL}/data/yards/${id}`, {
			method: "DELETE",
		})
			.then(() => {
				setYards(yards.filter((yard) => yard.id != id));
			})
			.catch((rejected) => {
				console.error(rejected);
			});
	};

	return (
		<>
			<AdminPageTitle
				title="Manage Yards"
				buttonLink="/admin/yards/add-yard"
				contentLength={yards.length}
			/>
			{yards.map((yard) => {
				return (
					<AdminContentBlock
						key={yard.id}
						content={yard}
						editValue={editValue}
						saveFunction={saveEditedYard}
						editAction={showEditForm}
						deleteFunction={deleteYard}
					/>
				);
			})}
		</>
	);
}
