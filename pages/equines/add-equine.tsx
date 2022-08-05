import React, {useState, useContext} from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Button } from '@mui/material';
import Form from '../components/form';
import Input from '../components/input';
import Select from '../components/select';
import { setServers } from 'dns';

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

    return (
        <div>
            <h1>Add an Equine</h1>
            <div>
                <Form action="/data/equines" method="post">
                    <label htmlFor="name">Name:</label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                    />

                    <label htmlFor="equine_yard">Yard:</label>
                    <Select
                        name="yard"
                        id="equine_yard"
                        onChange={handleChange}
                    >
                        <option value="yard 1">Yard 1</option>
                        <option value="yard 2">Yard 2</option>
                        <option value="yard 3">Yard 3</option>
                        <option value="yard 4">Yard 4</option>
                        <option value="yard 5">Yard 5</option>
                    </Select>

                    <label htmlFor="trainer-id">Trainer:</label>
                    <Input
                        type="number"
                        id="trainer_id"
                        min="1"
                        max="20"
                        name='trainer'
                        onChange={handleChange}
                    />

                    <label htmlFor="category">Category:</label>
                    <Select
                        name="category"
                        id="new_yard"
                        onChange={handleChange}
                    >
                        <option value="red">Red</option>
                        <option value="amber">Amber</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                    </Select>

                    <label htmlFor="programme">Programme:</label>
                    <Input
                        type="text"
                        id="programme"
                        name="programme"
                        onChange={handleChange}
                    />

                    <label htmlFor="skills">Skills:</label>
                    <Input
                        type="text"
                        id="skills"
                        name="skills"
                        onChange={handleChange}
                    />

                    <label htmlFor="training">Training:</label>
                    <Input
                        type="text"
                        id="training"
                        name="training"
                        onChange={handleChange}
                    />

                    <label htmlFor="on_hold">On Hold:</label>
                    <Input
                        type="checkbox"
                        name='onHold'
                        onChange={handleChange}
                    />
                    <Button variant="contained" onSubmit={submitEquine}>
                        Submit
                    </Button>
                </Form>
            </div>
            <div>
                <Link href="/equines">
                    <a>Go back to Equines</a>
                </Link>
            </div>
        </div>
    );
}