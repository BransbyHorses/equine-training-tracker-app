import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
    Typography
	} from "@mui/material";
import React from "react";

export default function PrimaryButton(props:any){

    return (
        <FormControl>
        <RadioGroup
            defaultValue="radioform"
            name="radio-buttons-group"
            onChange={props.handleChange}>
            {props.items.map(({id, name}) => {
                return (
            <FormControlLabel 
                key={id} 
                value={name} 
                control={<Radio/>} 
                label={name}
                 />
                )
            }
            )
        }
        </RadioGroup>
    </FormControl>
    )
}

    