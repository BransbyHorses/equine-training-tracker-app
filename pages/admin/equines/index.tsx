import Link from "next/link";
import { Typography, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import LinkButton from "../../../components/LinkButton";
import AutoCompleteBox from "../../../components/AutoCompleteBox";
import PageTitle from "../../../components/PageTitle";
import ListCard from "../../../components/ListCard";
import ListGrid from "../../../components/ListGrid";
import { Equine } from "../../../utils/types";
import AdminPageTitle from "../../../components/pages/admin/AdminPageTitle";

export default function Equines() {
	const [equines, setEquines] = useState<Equine[]>([]);

	function getEquines() {
		fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines`)
			.then((response) => response.json())
			.then((data) => setEquines(data))
			.catch((rejected) => {
				console.log(rejected);
			});
	}

	useEffect(() => {
		getEquines();
	}, []);

	return (
		<>
			<AdminPageTitle
				title="Manage Equines"
				buttonLink="/admin/equines/add-equine"
				contentLength={equines.length}
			/>
			{equines.length > 0 && (
				<ListGrid listItems={equines} listUrl={"equines"} />
			)}
		</>
	);
}
