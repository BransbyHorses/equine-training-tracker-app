import React, {useState, useContext} from 'react';
import Link from 'next/link';

export default function NewEquine (){
    const [name, setName] = useState('');
    const [yard, setYard] = useState('');
    const [trainer, setTrainer] = useState(0);
    const [category, setCategory] = useState('');
    const [programme, setProgramme] = useState('');
    const [skills, setSkills] = useState('');
    const [training, setTraining] = useState('');
    const [onHold, setOnHold] = useState(false);

    return(
        <div>
            <h1>Add an Equine</h1>
            <div>
                <form action="/data/equines" method='post' className='new_form'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id='name' name='name' onChange={(e) => setName(e.target.value)}/>

                    <label htmlFor="equine_yard">Yard:</label>
                    <select name="yard" id="equine_yard" onChange={(e) => setYard(e.target.value)}>
                        <option value="yard 1">Yard 1</option>
                        <option value="yard 2">Yard 2</option>
                        <option value="yard 3">Yard 3</option>
                        <option value="yard 4">Yard 4</option>
                        <option value="yard 5">Yard 5</option>
                    </select>

                    <label htmlFor="trainer-id"></label>
                    <input type="number" id='trainer_id' min='1' max='20'onChange={(e) => setTrainer(parseInt(e.target.value))}/>

                    <label htmlFor="category">Category:</label>
                    <select name="category" id="new_yard" onChange={(e) => setCategory(e.target.value)} >
                        <option value="red">Red</option>
                        <option value="amber">Amber</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                    </select>

                    <label htmlFor="programme">Programme:</label>
                    <input type="text" id='programme' name='programme' onChange={(e) => setProgramme(e.target.value)}/>

                    <label htmlFor="skills">Skills:</label>
                    <input type="text" id='skills' name='skills' onChange={(e) => setSkills(e.target.value)} />

                    <label htmlFor="training">Training:</label>
                    <input type="text" id='training' name='training' onChange={(e) => setTrainer(parseInt(e.target.value))} />

                    <label htmlFor="on_hold">On Hold:</label>
                    <input type="checkbox" onChange={(e) => setOnHold(e.target.checked)}/>
                </form>
            </div>
            <div>
                <Link href='/equines'>
                    <a>Go back to Equines</a>
                </Link>
            </div>
        </div>
    )
}