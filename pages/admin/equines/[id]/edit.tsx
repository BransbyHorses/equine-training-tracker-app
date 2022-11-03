import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import EditEquineYard from "../../../../components/pages/admin/editEquineYard";
import { useEquine } from "../../../../utils/hooks/equine";

const EditEquinePage = () => {
	const router = useRouter();
	const [editValue, setEditValue] = useState<string | undefined>(undefined);
	const [equineId, setEquineId] = useState<string | undefined>(undefined);
	const { fetchingData, equine, error, notFound } = useEquine(
		router.isReady,
		equineId
	);

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query.id as string);
		}
	}, [router.isReady]);

	// useEffect(() => {
	// 	if (router.query["value"]) {
	// 		setEditValue(router.query["value"] as string);
	// 	}
	// }, [router]);

	return (
		<EditEquineYard equineId="id" currentYard={equine && equine.yard ? equine.yard : undefined} />
	);
};

export default EditEquinePage;
