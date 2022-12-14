import React, { useEffect, useState } from "react";
import PageTitle from "../../../../components/PageTitle";
import BackBreadcrumb from "../../../../components/BackBreadcrumb";
import { useRouter } from "next/router";
import NavigationCard from "../../../../components/NavigationCard";
import NavigationGrid from "../../../../components/NavigationGrid";

export default function UpdateProfile() {
	const router = useRouter();
	const [equineId, setEquineId] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query.equineId as string);
		}
	}, [router.isReady, router.query.equineId]);

	return (
		<>
			<BackBreadcrumb />
			<PageTitle title="Update profile" />
			<NavigationGrid>
				<NavigationCard
					title="Start training programme"
					link={`/equines/${equineId}/update-profile/start-training-programme`}
				/>
				<NavigationCard
					title="Change handling status"
					link={`/equines/${equineId}/update-profile/change-handling-status`}
				/>
				<NavigationCard
					title="Add disruption"
					link={`/equines/${equineId}/update-profile/add-disruption`}
				/>
				<NavigationCard
					title="End training permanently"
					link={`/equines/${equineId}/update-profile/end-training`}
				/>
			</NavigationGrid>
		</>
	);
}
