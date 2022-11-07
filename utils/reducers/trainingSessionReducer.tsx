import axios from "axios";
import { Dayjs } from "dayjs";
import React, { Dispatch, useReducer } from "react";
import { Skill, TrainingEnvironment, TrainingMethod } from "../types";

interface NewTrainingSession {
	date?: Dayjs;
	skill?: Skill;
	environment?: TrainingEnvironment;
	progressCode: string;
	trainingMethod?: TrainingMethod;
	trainingTime?: string;
	notes: "";
}

export enum NewSkillTrainingSessionType {
	NEXT,
	BACK,
	GO_TO,
	SET_DATE,
	SET_SKILL,
	SET_ENVIRONMENT,
	SET_PROGRESS_CODE,
	SET_TRAINING_METHOD,
	SET_TRAINING_TIME,
	SET_NOTES,
	SAVE_NEW_TRAINING_SESSION,
}
interface NewSkillTrainingSessionAction {
	type: NewSkillTrainingSessionType;
	payload?: any;
}

export function skillTrainingSessionReducer(
	state: { formStage: string; newTrainingSession: NewTrainingSession },
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
				formStage: action.payload,
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
			return { ...state, skill: action.payload };
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
		default:
			return state;
	}
}

const formStages = [
	"date",
	"skillMethod",
	"environment",
	"progress",
	"summary",
	"success",
];
const newTrainingSession: NewTrainingSession = {
	date: undefined,
	skill: undefined,
	environment: undefined,
	progressCode: "",
	trainingMethod: undefined,
	trainingTime: undefined,
	notes: "",
};

interface NewTrainingSessionState {
	formStage: string;
	newTrainingSession: NewTrainingSession;
}

export const newTrainingSessionInitialState: NewTrainingSessionState = {
	formStage: formStages[0],
	newTrainingSession,
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
