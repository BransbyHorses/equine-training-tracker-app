import React, { useEffect, useState } from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import PageTitle from '../../../components/PageTitle';
import PageContainer from '../../../components/PageContainer';
import PrimaryButton from  '../../../components/PrimaryButton';
import BackBreadcrumb from "../../../components/BackBreadcrumb";
import { useRouter } from "next/router";
import getCollection from "../../../utils/hooks/getCollection";
import { Equine, LearnerType } from "../../../utils/types";




export default function ChangeTypeOfLearner() {

	const router = useRouter();
	const [learnerTypes, setLearnerTypes] = useState<LearnerType[]>([]);
	const [learnerType, setLearnerType] = useState<LearnerType>();
	const [equine, setEquine] = useState<Equine>();
	const { fetchingData, collection, error, notFound } = getCollection(
		'learner-types'
	);

	useEffect(() => {
		if (router.isReady) {
			console.log("In useEffect");
			getEquineFromId(router.query.equineId);
			console.log("equine is " + equine?.id);
			setLearnerTypes(collection);
			setLearnerType(equine?.learnerType);
		}
	}, [router.isReady]);

	const getEquineFromId = async (id) => {        
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines/${id}`)
            .then(response => response.json())
            .then(data => setEquine(data))
            .catch(rejected => {
                console.log(rejected);
            });
    }

	const updateEquine = async () => {
		console.log("Changing  " + learnerType)
		equine!.learnerType = learnerType!;
		console.log(JSON.stringify(equine));
		await fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines/${equine?.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(equine),
		})
			.then((response) => response.json())
			.then((data) => router.push(`/`))
			.catch((rejected: any) => {
				console.log(rejected);
			});
		}


	const handleChange = (event:any) => {
		console.log(event);
		var updatedLearnerType = learnerTypes.find(type => event.target.value == type.id);
		setLearnerType(updatedLearnerType);
		console.log(learnerType);	

	}

	return (
		<>
			<PageContainer>
				<BackBreadcrumb link="/" />
				<PageTitle title="Change handling status" />
				<FormControl>
				<InputLabel>Handling status</InputLabel>
					<Select onChange={handleChange}>
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
		</>
	);
};
