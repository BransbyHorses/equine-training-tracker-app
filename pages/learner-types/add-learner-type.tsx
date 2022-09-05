import React, {useState} from 'react';
import Link from 'next/link';
import {
    Button,
    Typography,
    Container,
    TextField,
    Grid
} from '@mui/material';


export default function NewLearnerType (){

    const [learnerType, setLearnerType] = useState({
        name: '',
    });

    const submitLearnerType = (e: any) => {
        e.preventDefault();
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/learner-types`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(learnerType)
        })
        .then(response => {
            response.json(); 
        })
        .then()
        .catch(rejected => {
            console.log(rejected);
        });
    };

    const handleChange = (e: any) => {
        setLearnerType({...learnerType, [e.target.name] : e.target.value})
    }
    
    return (
        <Container>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                Add a Learner Type
            </Typography>
            <div>
                <form onSubmit={submitLearnerType}>
                <Grid container direction="column" >
                    <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        color="secondary"
                        name="name"
                        onChange={handleChange}
                        required
                        sx={{my: "1rem"}}
                    />
                    <Button variant="contained" type='submit'>
                        Submit
                    </Button>
                    </Grid>
                </form>
            </div>
            <div>
                <Button variant="outlined" sx={{my: "1rem"}}>
                    <Link href="/learner-types">
                        <Typography>Go back to Learner Type</Typography>
                    </Link>
                </Button>
            </div>
        </Container>
    );
}