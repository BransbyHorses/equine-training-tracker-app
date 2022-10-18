import React, { useEffect, useState } from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import PageTitle from '../../../components/PageTitle';
import PageContainer from '../../../components/PageContainer';
import PrimaryButton from  '../../../components/PrimaryButton';
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import { useRouter } from "next/router";
import { useLearnerTypes } from "../../../utils/hooks/useLearnerTypes";
import { LearnerType } from "../../../utils/types";



export default function ChangeHandlingStatus() {

	const router = useRouter();
	const [types, setTypes] = useState<LearnerType[]>([]);
	const { fetchingData, learnerTypes, error, notFound } = useLearnerTypes(
		router.isReady
	);

	useEffect(() => {
		if (router.isReady) {
			setTypes(learnerTypes);
			console.log("Learners!")
			console.log(learnerTypes);
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
					{types.map(({id, name}) => {
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
