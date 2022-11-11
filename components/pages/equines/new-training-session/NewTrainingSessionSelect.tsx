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
        <InputLabel>{props.label}</InputLabel>
        <Select
            value={props.newTrainingSessionCategory}
            defaultValue={''}
            label={props.label}
            onChange={props.handleChange}
        >
            {props.categories.map((category:any) => {
                return (
                    <MenuItem key={category.id} value={category.id}>
                        {category.name}
                    </MenuItem>
                );
            })}
        </Select>
        </FormControl>
    )
}