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

const NewYard: React.FC<MyComponentProps> = props =>{

    const [newYard, setNewYard] = useState({
        name: '',
    });

    const submitYard = (e: any) => {
        e.preventDefault();
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/yards`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(newYard)
        })
        .then(response => {
            response.json(); 
        })
        .then(data => props.router.push('/admin/yards'))
        .catch(rejected => {
            console.log(rejected);
        });
    };

    const handleChange = (e: any) => {
        setNewYard({...newYard, [e.target.name] : e.target.value})
    }

    return (
        <Container>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                Add a Yard
            </Typography>
            <div>
                <form onSubmit={submitYard}>
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
                    <Link href="/admin/yards">
                        <Typography>Go back to Yards</Typography>
                    </Link>
                </Button>
            </div>
        </Container>
    );
};

export default withRouter(NewYard);