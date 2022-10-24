import React, { useState } from "react";
import dynamic from "next/dynamic";
import NewEquineForm from "../../../components/admin/newEquineForm";

const NewEquineHealthAndSafetyFlags = dynamic(
	() => import("../../../components/admin/NewEquineHealthAndSafetyFlags")
);

import NewEquineTrainingProgramme from "../../../components/admin/NewEquineTrainingProgramme";

import { Equine } from "../../../utils/types";

const NewEquine = () => {
	const [formStage, setFormStage] = useState<0 | 1 | 2>(0);
	const [newEquine, setNewEquine] = useState<Equine>();

	const showTrainingProgrammeSelect = (equine: Equine) => {
		setNewEquine(equine);
		setFormStage(1);
	};

	switch (formStage) {
		case 0: {
			return <NewEquineForm nextStep={showTrainingProgrammeSelect} />;
		}
		case 1: {
			return (
				<NewEquineTrainingProgramme
					equine={newEquine!}
					nextStep={() => setFormStage(2)}
				/>
			);
		}
		case 2: {
			return (
				<NewEquineHealthAndSafetyFlags
					equine={newEquine!}
					nextStep={() => null}
				/>
			);
		}
	}
};

export default NewEquine;
