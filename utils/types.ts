export interface Disruption {
	id: number;
	reason: { string: DisruptionCode; id: number };
	startDate: string;
	endDate?: string;
}

export interface DisruptionSimplified {
	id: number;
	name: string;
}

export interface Status {
	id: number;
	name: string;
	categorisedAsTraining: boolean;
}

export interface Equine {
	id: number;
	name: string;
	yard: Yard;
	equineStatus: EquineStatus;
	trainingProgrammes: TrainingProgramme[];
	learnerType: LearnerType;
	healthAndSafetyFlags: HealthAndSafetyFlag[];
	disruptions: Disruption[];
}

export interface EquineStatus {
	string:
		| "Awaiting Training"
		| "In Training"
		| "Returned To Owner"
		| "Rehomed"
		| "Euthanised"
		| "Other";
	id: 1 | 2 | 3 | 4 | 5 | 6;
	categorisedAsTraining: boolean;
}

export interface LearnerType {
	id: number;
	name: string;
}

export interface Skill {
	id: number;
	name: string;
}

export interface SkillProgressRecord {
	id: number;
	skill: Skill;
	trainingProgramme: TrainingProgramme;
	progressCode: { string: ProgressCode };
	startDate: string;
	endDate: string;
	time: number;
}

export interface SkillTrainingSession {
	id: number;
	date: string;
	trainingProgramme: TrainingProgramme;
	skill: Skill;
	environment: TrainingEnvironment;
	progressCode: { string: string };
	trainingMethod: TrainingMethod;
	trainingTime: number;
	notes: string;
}

export interface TrainingCategory {
	id: number;
	name: string;
}

export interface TrainingEnvironment {
	id: number;
	name: string;
}

export interface TrainingMethod {
	id: number;
	name: string;
}

export interface TrainingProgramme {
	id: number;
	trainingCategory: TrainingCategory;
	equine: Equine;
	skillProgressRecords: SkillProgressRecord[];
	skillTrainingSessions: SkillTrainingSession[];
	startDate: string;
	endDate: string;
}

export interface Yard {
	id: number;
	name: string;
}

export interface HealthAndSafetyFlag {
	id: number;
	content: string;
	dateCreated: string;
}

export enum ProgressCode {
	"Not able",
	"Limited",
	"Ok",
	"Confident",
}

export enum DisruptionCode {
	"Vetinary Review",
	"Team Low",
	"Weather",
	"Yard Busy",
	"Equine Wellbeing",
	"Other",
}
