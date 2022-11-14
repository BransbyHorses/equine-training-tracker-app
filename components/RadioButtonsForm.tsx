import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from "@mui/material";
import React from "react";

export default function RadioButtonsForm(props: any) {
	return (
		<FormControl>
			<RadioGroup
				defaultValue="radioform"
				name="radio-buttons-group"
				onChange={props.handleChange}
			>
				{props.items.map(({ id, name }: any) => {
					return (
						<FormControlLabel
							key={id}
							value={id}
							control={<Radio />}
							label={name}
						/>
					);
				})}
			</RadioGroup>
		</FormControl>
	);
}
