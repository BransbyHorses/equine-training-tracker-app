export interface Disruption {
    id: number,
    name: string
}

export interface Equine {
    id: number,
    name: string,
    yard: Yard,
    equineStatus: EquineStatus,
    trainingProgrammes: TrainingProgramme[],
    learnerType: LearnerType,
}

export interface EquineStatus {
    id: number,
    name: string
}

export interface LearnerType {
    id: number,
    name: string
}

export interface Skill {
    id: number,
    name: string
}

export interface SkillProgressRecord {
	id: number;
	trainingProgramme: TrainingProgramme;
	progressCode: { string: ProgressCode };
	startDate: string;
	endDate: string;
	time: number;
}

export interface SkillTrainingSession {
    id: number,
    date: string,
    trainingProgramme: TrainingProgramme,
    skill: Skill,
    environment: TrainingEnvironment,
    progressCode: { string: ProgressCode},
    trainingTime: number,
    notes: string

}

export interface TrainingCategory {
    id: number,
    name: string,
    description: string
}

export interface TrainingEnvironment {
    id: number,
    name: string
}

export interface TrainingMethod {
    id: number,
    name: string,
    description: string
}

export interface TrainingProgramme {
    id: number,
    trainingCategory: TrainingCategory,
    equine: Equine,
    skillProgressRecords: SkillProgressRecord[],
    skillTrainingSessions: SkillTrainingSession[],
    startDate: string,
    endDate: string
}

export interface Yard {
    id: number,
    name: string
}

export enum ProgressCode {
    "Not able",
    "Just started",
    "Ok with limits",
    "Confident"
}