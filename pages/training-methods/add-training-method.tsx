import React, {useState} from 'react';
import { withRouter, NextRouter } from 'next/router';
import Link from 'next/link';
import {
    Button,
    Typography,
    Container,
    TextField,
    Grid
} from '@mui/material';

interface WithRouterProps {
    router: NextRouter;
}

interface MyComponentProps extends WithRouterProps {}

const NewTrainingMethod: React.FC<MyComponentProps> = props =>{

    const [newTrainingMethod, setNewTrainingMethod] = useState({
        name: '',
        description: ''
    });

    const submitTrainingMethod = (e: any) => {
        e.preventDefault();
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/training-methods`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(newTrainingMethod)
        })
        .then(response => {
            response.json(); 
        })
        .then(data => props.router.push('/training-methods'))
        .catch(rejected => {
            console.log(rejected);
        });
    };

    const handleChange = (e: any) => {
        setNewTrainingMethod({...newTrainingMethod, [e.target.name] : e.target.value})
    }

    return (
        <Container>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                Add a Training Method
            </Typography>
            <div>
                <form onSubmit={submitTrainingMethod}>
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
                    <TextField
                        id="description"
                        label="Description"
                        variant="outlined"
                        color="secondary"
                        name="description"
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
                    <Link href="/training-methods">
                        <Typography>Go back to Training Methods</Typography>
                    </Link>
                </Button>
            </div>
        </Container>
    );
};

export default withRouter(NewTrainingMethod);