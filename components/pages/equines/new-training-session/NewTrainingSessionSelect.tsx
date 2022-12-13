import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export interface NewTrainingSessionSelectProps {
	categories: any[];
	label: string;
	id: string;
	handleChange: (_e: any) => void;
	value: any;
}

export default function NewTrainingSessionSelect(
	props: NewTrainingSessionSelectProps
) {
	// this check is to handle a "Material-UI: You have provided an out-of-range value" warning
	if (props.categories.length === 0) {
		return (
			<FormControl fullWidth>
				<InputLabel>{props.label}</InputLabel>
				<Select fullWidth label={props.label} value=""></Select>
			</FormControl>
		);
	}

	return (
		<FormControl fullWidth>
			<InputLabel>{props.label}</InputLabel>
			<Select
				id={props.id}
				value={props.value}
				label={props.label}
				onChange={props.handleChange}
			>
				{props.categories.length &&
					props.categories.map((category: any) => {
						return (
							<MenuItem key={category.id} value={category.id}>
								{category.name}
							</MenuItem>
						);
					})}
			</Select>
		</FormControl>
	);
}
