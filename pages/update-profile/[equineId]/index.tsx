import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import { useRouter } from "next/router";
import NavigationCard from "../../../components/NavigationCard";
import NavigationGrid from "../../../components/NavigationGrid";

export default function UpdateProfile() {
	const router = useRouter();
	const [equineId, setEquineId] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query.equineId as string);
		}
	}, [router.isReady]);

	return (
		<>
			<BackBreadcrumb />
			<PageTitle title="Update profile" />
			<NavigationGrid>
				<NavigationCard
					title="Start training programme"
					link={`/start-training-programme/${equineId}`}
				/>
				<NavigationCard
					title="Change handling status"
					link={`/change-handling-status/${equineId}`}
				/>
				<NavigationCard
					title="Add disruption"
					link={`/add-disruption/${equineId}`}
				/>
				<NavigationCard
					title="End training permanently"
					link={`/end-training/${equineId}`}
				/>
			</NavigationGrid>
		</>
	);
}
