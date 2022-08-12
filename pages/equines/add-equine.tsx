import React, {useState, useContext} from 'react';
import Link from 'next/link';
import {Button, Select, Typography, Container, TextField, MenuItem, Input, Checkbox, FormControlLabel} from '@mui/material';

import Form from '../../components/styles/form';


export default function NewEquine (){

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

    const submitEquine = () => {
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(newEquine)
        })
        .then(response => response.json())
        .catch(rejected => {
            console.log(rejected);
        });
    };

    const handleChange = (e: any) => {
        setNewEquine({...newEquine, [e.target.name] : e.target.value})
    }

    const handleClick = (e: any) => {
        console.log(e);
        
    }
    return (
        <Container>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                Add an Equine
            </Typography>
            <div>
                <Form>
                    <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        color="secondary"
                        name='name'
                        onChange={handleChange}
                        required
                    />

                    <Select
                        label="Yard"
                        id="yard"
                        name='yard'
                        defaultValue={'yard 1'}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="yard 1">Yard 1</MenuItem>
                        <MenuItem value="yard 2">Yard 2</MenuItem>
                        <MenuItem value="yard 3">Yard 3</MenuItem>
                        <MenuItem value="yard 4">Yard 4</MenuItem>
                        <MenuItem value="yard 5">Yard 5</MenuItem>
                    </Select>
                    <Input
                        type="number"
                        id="trainer_id"
                        name="trainer"
                        onChange={handleChange}
                    />
                    <Select
                        name="category"
                        id="category"
                        value={'red'}
                        onChange={handleChange}
                    >
                        <MenuItem value="red">Red</MenuItem>
                        <MenuItem value="amber">Amber</MenuItem>
                        <MenuItem value="blue">Blue</MenuItem>
                        <MenuItem value="green">Green</MenuItem>
                    </Select>
                    <TextField
                        id="programme"
                        label="Programme"
                        variant="outlined"
                        color="secondary"
                        name='programme'
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        id="skills"
                        label="Skills"
                        variant="outlined"
                        color="secondary"
                        name='skills'
                        onChange={handleChange}
                    />
                    <TextField
                        id="training"
                        label="Training"
                        name='training'
                        onChange={handleChange}
                        required
                    />
                    <FormControlLabel
                        control={<Checkbox name='onHold' checked={newEquine.onHold} onClick={handleClick} />}
                        label="On Hold"
                    />
                    <Button variant="contained" onSubmit={submitEquine}>
                        Submit
                    </Button>
                </Form>
            </div>
            <div>
                <Button variant="outlined">
                    <Link href="/equines">
                        <Typography>Go back to Equines</Typography>
                    </Link>
                </Button>
            </div>
        </Container>
    );
}