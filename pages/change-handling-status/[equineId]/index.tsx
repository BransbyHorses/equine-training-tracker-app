import React, { useEffect, useState } from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import PageTitle from '../../../components/PageTitle';
import PageContainer from '../../../components/PageContainer';
import PrimaryButton from  '../../../components/PrimaryButton';
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import { useRouter } from "next/router";
import getCollection from "../../../utils/hooks/getCollection";
import { LearnerType } from "../../../utils/types";



export default function ChangeHandlingStatus() {

	const router = useRouter();
	const [learnerTypes, setLearnerTypes] = useState<LearnerType[]>([]);
	const { fetchingData, collection, error, notFound } = getCollection(
		'learner-types'
	);

	useEffect(() => {
		if (router.isReady) {
			setLearnerTypes(collection);
			console.log("TYPES")
			console.log(learnerTypes)
		}
	}, [router.isReady]);

	return (
		<>
			<PageContainer>
				<BackBreadcrumb link="/" />
				<PageTitle title="Change handling status" />
				<FormControl>
				<InputLabel>Handling status</InputLabel>
					<Select>
					{learnerTypes.map(({id, name}) => {
						return (
							<MenuItem key={id} value={name}>
								{name}
							</MenuItem>
							)
						}
						)
					}
					</Select>
				</FormControl>

				<PrimaryButton buttonText="Save" link="/"/>

			</PageContainer>
		</>
	);
};
