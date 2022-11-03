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




export default function ChangeTypeOfLearner() {

	const router = useRouter();
	const [learnerTypes, setLearnerTypes] = useState<LearnerType[]>([]);
	const [equine, setEquine] = useState<Equine | undefined>(undefined);
	const { fetchingData, collection, error } = getCollection(
		'learner-types'
	);
	const [learnerType, setLearnerType] = useState<LearnerType>();

	useEffect(() => {
		if (router.isReady) {
			getEquineFromId(router.query.equineId);
			setLearnerTypes(collection);
			setLearnerType(equine?.learnerType);
		}
	}, [router.isReady]);

	const getEquineFromId = async (id:any) => {        
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines/${id}`)
            .then(response => response.json())
            .then(data => setEquine(data))
            .catch(rejected => {
                console.log(rejected);
            });
		console.log("equine set to")
		console.log(equine);
    }

	const updateEquine = async () => {
		equine!.learnerType = learnerType!;
		saveData(equine!, `equines/${equine!.id}`, 'PUT');
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
			<PageContainer>
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
					handleChange={updateEquine}
				/>
			</PageContainer>
	);
};
