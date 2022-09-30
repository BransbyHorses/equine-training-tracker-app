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

const NewDisruption: React.FC<MyComponentProps> = props =>{

    const [newDisruption, setNewDisruption] = useState({
        name: '',
    });

    const submitDisruption = (e: any) => {
        e.preventDefault();
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/disruptions`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(newDisruption)
        })
        .then(response => {
            response.json(); 
        })
        .then(data => props.router.push('/disruptions'))
        .catch(rejected => {
            console.log(rejected);
        });
    };

    const handleChange = (e: any) => {
        setNewDisruption({...newDisruption, [e.target.name] : e.target.value})
    }

    return (
        <Container>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                Add a Disruption
            </Typography>
            <div>
                <form onSubmit={submitDisruption}>
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
                    <Link href="/disruptions">
                        <Typography>Go back to Disruptions</Typography>
                    </Link>
                </Button>
            </div>
        </Container>
    );
};

export default withRouter(NewDisruption);