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
    Grid,
    InputLabel
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
    learnerType: string;
}

interface WithRouterProps {
    router: NextRouter
}

interface MyComponentProps extends WithRouterProps {}

const NewEquine: React.FC<MyComponentProps> = (props) => {
    
    const learners = options.typeOfLearner;
    
    const [newEquine, setNewEquine] = useState({
        name: '',
        learnerType: '',
        trainer: 0,
        category: '',
        programme: '',
        skills: '',
        training: '',
        onHold: false
    });


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

                        <FormControl>
                            <InputLabel id="learner_type_label">
                                Learner Type
                            </InputLabel>
                            <Select
                                labelId="learner_type_label"
                                label="Learner Type"
                                name="learnerType"
                                value={props.children}
                                onChange={handleChange}
                            >
                                {learners.map((learner, index) => {
                                    return (
                                        <MenuItem value={learner} key={index}>
                                            {learner}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        <TextField
                            type="number"
                            id="trainer_id"
                            label="Trainer Id"
                            name="trainer"
                            onChange={handleChange}
                            sx={{ my: '1rem' }}
                        />

                        <FormControl>
                            <InputLabel id="category_label">
                                Category
                            </InputLabel>
                            <Select
                                labelId="category_label"
                                label="Category"
                                name="category"
                                value={newEquine.category}
                                onChange={handleChange}
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
                    <Link href="/dashboard/admin">
                        <Typography>Go back to Dashboard</Typography>
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

