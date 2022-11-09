import { useEffect, useState } from "react";
import EquineListGrid from "../../../components/EquineListGrid";
import { Equine } from "../../../utils/types";
import AdminPageTitle from "../../../components/pages/admin/AdminPageTitle";
import AutoCompleteBox from "../../../components/AutoCompleteBox";

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
			<AutoCompleteBox
				options={equines.map((equine) => {
					return { optionName: equine.name, optionId: equine.id };
				})}
				label="Search equines"
				linkName="equines"
			/>
			{equines.length > 0 && <EquineListGrid equines={equines} />}
		</>
	);
}
