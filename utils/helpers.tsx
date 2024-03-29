import { Equine, TrainingProgramme, SkillTrainingSession, Disruption } from "./types";

export const findCurrentTrainingProgramme = (
	trainingProgrammes?: TrainingProgramme[]
) => {
	if (!trainingProgrammes) {
		return null;
	}

	const filteredTrainingProgrammes = trainingProgrammes.filter(
		(t) => !t.endDate
	);
	return filteredTrainingProgrammes.length === 0
		? null
		: filteredTrainingProgrammes[0];
};

export const convertDateToString = (dateString?: string) => {
	if (!dateString) return "";

	const date = new Date(dateString);
	return date.toLocaleString("en-GB", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

export const findLastTrainingSession = (
	skillTrainingSessions?: SkillTrainingSession[]
) => {
	if (!skillTrainingSessions || skillTrainingSessions.length === 0) return null;

	const sortedRecordsByDate = skillTrainingSessions.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});

	return sortedRecordsByDate[0];
};

export const findActiveDisruption = (disruptions: Disruption[] | []) => {
	if (disruptions.length === 0) {
		return null;
	}

	const activeDisruptions = disruptions.filter(
		(disruption) => !disruption.endDate
	);

	return activeDisruptions.length === 0 ? null : activeDisruptions[0];
};
export const generateTodaysDate = () => {
	let date = new Date();
	let today = date.getFullYear() + "-" + padZero((date.getMonth() + 1), 2) + "-" + padZero(date.getDate(), 2);
	return today;
}

const padZero = (num: number, pad: number) => num.toString().padStart(pad, '0');

export const saveData = async (data:any, path:string, method:string) => {
	await fetch(`${process.env.NEXT_PUBLIC_URL}/data/${path}`, {
		method: method,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.then((data) => {})
		.catch((rejected: any) => {
			console.log(rejected);
		});
}

export const convertEnumStringKeyToName = (item:any) => {
	item['name'] = item['string'];
	delete item['string'];
}
