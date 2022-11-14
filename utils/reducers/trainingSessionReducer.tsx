import axios from "axios";
import { Dayjs } from "dayjs";
import React, { Dispatch, useReducer } from "react";
import {
	Skill,
	TrainingEnvironment,
	TrainingMethod,
	TrainingProgramme,
} from "../types";

interface NewTrainingSession {
	date?: Dayjs;
	skill?: Skill;
	environment?: TrainingEnvironment;
	progressCode: string;
	trainingMethod?: TrainingMethod;
	trainingTime?: Number;
	notes: "";
}

export enum NewSkillTrainingSessionType {
	NEXT,
	BACK,
	GO_TO,
	SET_TRAINING_PROGRAMME,
	SET_DATE,
	SET_SKILL,
	SET_ENVIRONMENT,
	SET_PROGRESS_CODE,
	SET_TRAINING_METHOD,
	SET_TRAINING_TIME,
	SET_NOTES,
	SAVE_NEW_TRAINING_SESSION,
	RESET,
}
interface NewSkillTrainingSessionAction {
	type: NewSkillTrainingSessionType;
	payload?: any;
}

const formStages = [
	"date",
	"skillMethod",
	"environment",
	"progress",
	"summary",
	"success",
];

export function skillTrainingSessionReducer(
	state: NewTrainingSessionState,
	action: NewSkillTrainingSessionAction
) {
	switch (action.type) {
		case NewSkillTrainingSessionType.NEXT:
			return {
				...state,
				formStage: formStages[formStages.indexOf(state.formStage) + 1],
			};
		case NewSkillTrainingSessionType.BACK:
			return {
				...state,
				formStage: formStages[formStages.indexOf(state.formStage) - 1],
			};
		case NewSkillTrainingSessionType.GO_TO:
			return {
				...state,
				formStage: formStages[formStages.indexOf(action.payload)],
			};
		case NewSkillTrainingSessionType.SET_TRAINING_PROGRAMME:
			return {
				...state,
				trainingProgramme: action.payload,
			};
		case NewSkillTrainingSessionType.SET_DATE:
			return {
				...state,
				newTrainingSession: {
					...state.newTrainingSession,
					date: action.payload,
				},
			};
		case NewSkillTrainingSessionType.SET_SKILL:
			return {
				...state,
				newTrainingSession: {
					...state.newTrainingSession,
					skill: action.payload,
				},
			};
		case NewSkillTrainingSessionType.SET_ENVIRONMENT:
			return {
				...state,
				newTrainingSession: {
					...state.newTrainingSession,
					environment: action.payload,
				},
			};
		case NewSkillTrainingSessionType.SET_PROGRESS_CODE:
			return {
				...state,
				newTrainingSession: {
					...state.newTrainingSession,
					progressCode: action.payload,
				},
			};
		case NewSkillTrainingSessionType.SET_TRAINING_METHOD:
			return {
				...state,
				newTrainingSession: {
					...state.newTrainingSession,
					trainingMethod: action.payload,
				},
			};
		case NewSkillTrainingSessionType.SET_TRAINING_TIME:
			return {
				...state,
				newTrainingSession: {
					...state.newTrainingSession,
					trainingTime: action.payload,
				},
			};
		case NewSkillTrainingSessionType.SET_NOTES:
			return {
				...state,
				newTrainingSession: {
					...state.newTrainingSession,
					notes: action.payload,
				},
			};
		case NewSkillTrainingSessionType.RESET:
			return {
				trainingProgramme: state.trainingProgramme,
				formStage: formStages[0],
				newTrainingSession: newTrainingSessionInitialState.newTrainingSession,
			};
		default:
			return state;
	}
}

const newTrainingSession: NewTrainingSession = {
	date: undefined,
	skill: undefined,
	environment: undefined,
	progressCode: "",
	trainingMethod: undefined,
	trainingTime: 0,
	notes: "",
};

interface NewTrainingSessionState {
	formStage: string;
	newTrainingSession: NewTrainingSession;
	trainingProgramme?: TrainingProgramme;
}

export const newTrainingSessionInitialState: NewTrainingSessionState = {
	formStage: formStages[0],
	newTrainingSession,
	trainingProgramme: undefined,
};

interface NewTrainingSessionContextProps {
	state: NewTrainingSessionState;
	dispatch: Dispatch<NewSkillTrainingSessionAction>;
}

export const NewTrainingSessionContext = React.createContext({
	state: newTrainingSessionInitialState,
	dispatch: () => null,
} as NewTrainingSessionContextProps);

export const NewTrainingSessionProvider = (props: any) => {
	const [state, dispatch] = useReducer(
		skillTrainingSessionReducer,
		newTrainingSessionInitialState
	);
	return (
		<NewTrainingSessionContext.Provider value={{ state, dispatch }}>
			{props.children}
		</NewTrainingSessionContext.Provider>
	);
};

export function useNewSkillTrainingSession() {
	const context = React.useContext(NewTrainingSessionContext);
	if (context === undefined) {
		throw new Error(
			"useNewSkillTrainingSession must be used within a NewTrainingSessionProvider"
		);
	}
	return context;
}
