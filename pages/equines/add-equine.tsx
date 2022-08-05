import React, {useState, useContext} from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Button } from '@mui/material';

export default function NewEquine (){
    const [name, setName] = useState('');
    const [yard, setYard] = useState('');
    const [trainer, setTrainer] = useState(0);
    const [category, setCategory] = useState('');
    const [programme, setProgramme] = useState('');
    const [skills, setSkills] = useState('');
    const [training, setTraining] = useState('');
    const [onHold, setOnHold] = useState(false);

    const Form = styled.form`
        display: flex;
        flex-direction: column;
    `;
    const Input = styled.input`
        height: 30px;
    `
    const Select = styled.select`
        height: 40px;
    `

    const submitEquine = () => {
        const equineData = {
            name,
            yard,
            trainer,
            category,
            programme,
            skills,
            training,
            onHold
        };
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(equineData)
        })
        .then(response => response.json())
        .catch(rejected => {
            console.log(rejected);
        });
    };

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
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="equine_yard">Yard:</label>
                    <Select
                        name="yard"
                        id="equine_yard"
                        onChange={e => setYard(e.target.value)}
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
                        onChange={e => setTrainer(parseInt(e.target.value))}
                    />

                    <label htmlFor="category">Category:</label>
                    <Select
                        name="category"
                        id="new_yard"
                        onChange={e => {
                            setCategory(e.target.value);
                            e.preventDefault();
                        }}
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
                        onChange={e => setProgramme(e.target.value)}
                    />

                    <label htmlFor="skills">Skills:</label>
                    <Input
                        type="text"
                        id="skills"
                        name="skills"
                        onChange={e => setSkills(e.target.value)}
                    />

                    <label htmlFor="training">Training:</label>
                    <Input
                        type="text"
                        id="training"
                        name="training"
                        onChange={e => setTrainer(parseInt(e.target.value))}
                    />

                    <label htmlFor="on_hold">On Hold:</label>
                    <Input
                        type="checkbox"
                        onChange={e => setOnHold(e.target.checked)}
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