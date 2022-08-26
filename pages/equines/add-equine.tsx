import React, { useState, FC } from 'react';
import Link from 'next/link'
import { withRouter, NextRouter } from 'next/router'
import {
    Button,
    Select,
    Typography,
    Container,
    TextField,
    MenuItem,
    Checkbox,
    FormControlLabel,
    FormControl,
    FormGroup,
    Grid
} from '@mui/material';
import options from '../../properties/properties';

interface Equine {
    id: number;
    name: string;
    category: string;
    onHold: boolean;
    programme: string;
    skills: string;
    trainerId: number;
    training: string;
    yard: string;
}

interface Learners {
    learners: Array
}

interface WithRouterProps {
    router: NextRouter
}

interface MyComponentProps extends WithRouterProps {}

const NewEquine: React.FC<MyComponentProps> = (props) => {
    
    const [newEquine, setNewEquine] = useState({
        name: '',
        yard: '',
        trainer: 0,
        category: '',
        programme: '',
        skills: '',
        training: '',
        onHold: false
    });

    const learners = options.typeOfLearner;


    const submitEquine = async (e: any) => {
        e.preventDefault();
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEquine)
        })
            .then(response => response.json())
            .then(data => props.router.push(`/equines/${data.id}`))
            .catch((rejected: any) => {
                console.log(rejected);
            });
    };

    const handleChange = (e: any) => {
        setNewEquine({ ...newEquine, [e.target.name]: e.target.value });
    };

    const handleClick = (e: any) => {
        setNewEquine({ ...newEquine, [e.target.name]: !newEquine.onHold });
    };
    return (
        <Container>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                Add an Equine
            </Typography>
            <div>
                <form onSubmit={submitEquine}>
                    <Grid container direction="column">
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            color="secondary"
                            name="name"
                            onChange={handleChange}
                            required
                            sx={{ my: '1rem' }}
                        />
                        <FormControl sx={{ my: '1rem' }}>
                            <Select
                                label="Yard"
                                id="yard"
                                name="yard"
                                value={newEquine.yard}
                                onChange={handleChange}
                                required
                            >
                               {learners.map((learner, index) => {
                                    return(
                                        <MenuItem value="yard 2" key={index}>{learner}</MenuItem>
                                    )
                               })}
                                
                                {/* <MenuItem value="yard 1">Yard 1</MenuItem>
                                <MenuItem value="yard 2">Yard 2</MenuItem>
                                <MenuItem value="yard 3">Yard 3</MenuItem>
                                <MenuItem value="yard 4">Yard 4</MenuItem>
                                <MenuItem value="yard 5">Yard 5</MenuItem> */}
                            </Select>
                        </FormControl>
                        {Object.keys(options.typeOfLearner).forEach(learner => {
                            <Typography>learner</Typography>;
                        })}
                        <TextField
                            type="number"
                            id="trainer_id"
                            label="Trainer Id"
                            name="trainer"
                            onChange={handleChange}
                            sx={{ my: '1rem' }}
                        />
                        <FormControl>
                            <Select
                                name="category"
                                label="Category"
                                id="category"
                                value={newEquine.category}
                                onChange={handleChange}
                                sx={{ my: '1rem' }}
                            >
                                <MenuItem value="red">Red</MenuItem>
                                <MenuItem value="amber">Amber</MenuItem>
                                <MenuItem value="blue">Blue</MenuItem>
                                <MenuItem value="green">Green</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            sx={{ my: '1rem' }}
                            id="programme"
                            label="Programme"
                            variant="outlined"
                            color="secondary"
                            name="programme"
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            sx={{ my: '1rem' }}
                            id="skills"
                            label="Skills"
                            variant="outlined"
                            color="secondary"
                            name="skills"
                            onChange={handleChange}
                        />
                        <TextField
                            sx={{ my: '1rem' }}
                            id="training"
                            label="Training"
                            name="training"
                            onChange={handleChange}
                            required
                        />
                        <FormGroup>
                            <FormControlLabel
                                sx={{ my: '1rem' }}
                                control={
                                    <Checkbox
                                        name="onHold"
                                        checked={newEquine.onHold}
                                        onClick={handleClick}
                                    />
                                }
                                label="On Hold"
                            />
                        </FormGroup>

                        <Button variant="contained" type="submit">
                            Submit
                        </Button>
                    </Grid>
                </form>
            </div>
            <div>
                <Button variant="outlined" sx={{ my: '1rem' }}>
                    <Link href="/equines">
                        <Typography>Go back to Equines</Typography>
                    </Link>
                </Button>
            </div>
        </Container>
    );
};

export default withRouter(NewEquine);
function learnerType(learnerType: any): React.ReactNode {
    throw new Error('Function not implemented.');
}

