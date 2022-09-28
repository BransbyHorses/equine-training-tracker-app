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

const NewProgramme: React.FC<MyComponentProps> = props => {

    const [newProgramme, setNewProgramme] = useState({
        name: '',
    });

    const submitProgramme = (e: any) => {
        e.preventDefault();
        const programmeToPost = {
            id: 0,
            name: newProgramme.name
        }
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/programmes`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(programmeToPost)
        })
        .then(response => {
            response.json(); 
        })
        .then(data => props.router.push('/programmes'))
        .catch(rejected => {
            console.log(rejected);
        });
    };

    const handleChange = (e: any) => {
        setNewProgramme({...newProgramme, [e.target.name] : e.target.value})
    }

    return (
        <Container>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                Add a Programme
            </Typography>
            <div>
                <form onSubmit={submitProgramme}>
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
                    <Link href="/programmes">
                        <Typography>Go back to Programmes</Typography>
                    </Link>
                </Button>
            </div>
        </Container>
    );
};
export default withRouter(NewProgramme);