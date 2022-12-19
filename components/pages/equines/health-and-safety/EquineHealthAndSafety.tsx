import React, { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { HealthAndSafetyFlag } from "../../../../utils/types";
import LoadingSpinner from "../../../LoadingSpinner";

const HealthAndSafetyFlagForm = dynamic(
	() => import("../health-and-safety/HealthAndSafetyFlagForm")
);

const HealthAndSafetyFlags = dynamic(
	() => import("../health-and-safety/HealthAndSafetyFlags")
);

const EquineHealthAndSafety = ({
	equineId,
	healthAndSafetyFlags,
}: {
	equineId: string;
	healthAndSafetyFlags?: HealthAndSafetyFlag[];
}) => {
	const [showFlags, setShowFlags] = useState(true);
	const [updatedhealthAndSafetyFlags, setUpdatedhealthAndSafetyFlags] =
		useState<HealthAndSafetyFlag[]>(healthAndSafetyFlags || []);
	const [apiError, setApiError] = useState(false);
	const [apiSuccess, setApiSuccess] = useState(false);
	const [sendingRequest, setSendingRequest] = useState(false);

	const openForm = () => {
		setShowFlags(false);
	};
	const openFlags = () => {
		setShowFlags(true);
		setApiError(false);
	};

	const saveHealhAndSafetyFlag = (content: string) => {
		setApiError(false);
		setSendingRequest(true);
		axios
			.post(
				`${process.env.NEXT_PUBLIC_URL}/data/equines/${equineId}/health-and-safety-flags`,
				{
					content,
				}
			)
			.then(({ data }) => {
				setApiSuccess(true);
				setUpdatedhealthAndSafetyFlags([...updatedhealthAndSafetyFlags, data]);
			})
			.catch((err) => {
				setApiError(true);
				console.error(err);
			})
			.finally(() => {
				setSendingRequest(false);
				setTimeout(() => {
					setApiSuccess(false);
				}, 3000);
			});
	};

	const deleteHealhAndSafetyFlag = (healthAndSafetyFlagId: number) => {
		axios
			.delete(
				`${process.env.NEXT_PUBLIC_URL}/data/health-and-safety-flags/${healthAndSafetyFlagId}`
			)
			.then(() => {
				setUpdatedhealthAndSafetyFlags(
					updatedhealthAndSafetyFlags.filter(
						(healthAndSafetyFlag) =>
							healthAndSafetyFlag.id !== healthAndSafetyFlagId
					)
				);
			})
			.catch((err) => {console.error(err);});
	};

	return (
		<Suspense fallback={<LoadingSpinner />}>
			{showFlags ? (
				<HealthAndSafetyFlags
					closeFlags={openForm}
					deleteFlag={deleteHealhAndSafetyFlag}
					healthAndSafetyFlags={updatedhealthAndSafetyFlags.sort(
						(a, b) =>
							new Date(b.dateCreated).getTime() -
							new Date(a.dateCreated).getTime()
					)}
				/>
			) : (
				<HealthAndSafetyFlagForm
					closeForm={openFlags}
					saveFunction={saveHealhAndSafetyFlag}
					waiting={sendingRequest}
					success={apiSuccess}
					error={apiError}
				/>
			)}
		</Suspense>
	);
};

export default EquineHealthAndSafety;
