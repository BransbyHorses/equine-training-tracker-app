import React, { useEffect, useState } from "react";
import {FormControl, InputLabel, MenuItem, Select, Box} from "@mui/material";
import PageTitle from '../../../components/PageTitle';
import PageContainer from '../../../components/PageContainer';
import PrimaryButton from  '../../../components/PrimaryButton';
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useRouter } from "next/router";
import getCollection from "../../../utils/hooks/getCollection";
import { Equine, LearnerType } from "../../../utils/types";
import { saveData } from "../../../utils/helpers";




export default function ChangeHandlingStatus() {

	const router = useRouter();
	const [learnerTypes, setLearnerTypes] = useState<LearnerType[]>([]);
	const [learnerType, setLearnerType] = useState<LearnerType>();
	const [equineId, setEquineId] = useState<string | undefined>(undefined);
	const { fetchingData, collection, error } = getCollection(
		'learner-types'
	);

	useEffect(() => {
		if (router.isReady) {
			setEquineId(router.query.equineId as string);
			setLearnerTypes(collection);
		}
	}, [router.isReady]);


	const updateEquineLearnerType = async () => {
		saveData("", `/equines/${equineId}/learner-type/${learnerType?.id}`, 'PATCH');
		router.push('/');
	}


	const handleChange = (event:any) => {
		let updatedLearnerType = learnerTypes.find(type => event.target.value == type.id);
		setLearnerType(updatedLearnerType);
	}

	if (fetchingData) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<LoadingSpinner />
			</Box>
		);
	} 

	return (
			<>
				<BackBreadcrumb />
				<PageTitle title="Change handling status" />
				<FormControl>
				<InputLabel id="learner-type-selection">Handling status</InputLabel>
					<Select
						value={learnerType?.name}
						label="Learner type"
						onChange={handleChange}>
					{learnerTypes.map(({id, name}) => {
						return (
							<MenuItem 
								key={id} 
								value={id} >
									{name}
							</MenuItem>
							)
						}
						)
					}
					</Select>
				</FormControl>

				<PrimaryButton 
					buttonText="Save" 
					link="/"
					handleChange={updateEquineLearnerType}
				/>
			</>
	);
};
