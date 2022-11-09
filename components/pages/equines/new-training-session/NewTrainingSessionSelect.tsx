import { 
    Box, 
    FormControl, 
    InputLabel, 
    MenuItem,
    Select  
} from "@mui/material";


export default function NewTrainingSessionSelect(props: any) {
    return (
        <FormControl fullWidth>
        <InputLabel id={props.id}>{props.label}</InputLabel>
        <Select
            value={props.newTrainingSessionCategory || ''}
            name={props.newTrainingSessionCategory?.name}
            label={props.label}
            onChange={props.handleChange}
        >
            {props.categories.map((category:any) => {
                return (
                    <MenuItem key={category.id} value={category || ''}>
                        {category.name}
                    </MenuItem>
                );
            })}
        </Select>
        </FormControl>
    )
}