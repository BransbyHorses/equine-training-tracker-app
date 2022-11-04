import React, { createContext } from "react";
import {
	Skill,
	SkillTrainingSession,
	TrainingEnvironment,
	TrainingMethod,
} from "../types";

enum NewSkillTrainingSessionType {
	NEXT,
	BACK,
	SET_DATE,
	SET_SKILL,
	SET_ENVIRONMENT,
	SET_PROGRESS_CODE,
	SET_TRAINING_METHOD,
	SET_TRAINING_TIME,
	SET_NOTES,
}

interface NewSkillTrainingSessionAction {
	type: NewSkillTrainingSessionType;
	payload: any;
}

const formStages = ["date", "skill_method", "progress", "summary"];

interface NewTrainingSession {
	date: string;
	skill?: Skill;
	environment?: TrainingEnvironment;
	progressCode: string;
	trainingMethod?: TrainingMethod;
	trainingTime?: string;
	notes: "";
}

const newTrainingSession: NewTrainingSession = {
	date: "",
	skill: undefined,
	environment: undefined,
	progressCode: "",
	trainingMethod: undefined,
	trainingTime: undefined,
	notes: "",
};

export const newTrainingSessionState: {
	formStage: string;
	newTrainingSession: NewTrainingSession;
} = {
	formStage: formStages[0],
	newTrainingSession,
};

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
