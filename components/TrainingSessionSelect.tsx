import { 
    FormControl, 
    InputLabel, 
    MenuItem,
    Select,  } from "@mui/material";



export default function TrainingSessionSelect(props: any) {

return (
    <FormControl fullWidth>
    <InputLabel id="environment-selection">Environment</InputLabel>
    <Select
        value={props.category}
        name={props.category?.name}
        label="Environment"
        onChange={props.handleChange}
    >
        {props.categories.map(category => {
            return (
                <MenuItem key={props.category.id} value={props.category}>
                    {props.category.name}
                </MenuItem>
            );
        })}
    </Select>
    </FormControl>
    );

}