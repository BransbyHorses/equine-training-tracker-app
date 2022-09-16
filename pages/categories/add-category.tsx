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

const NewCategory: React.FC<MyComponentProps> = props => {

    const [newCategory, setNewCategory] = useState({
        name: '',
    });

    const submitCategory = (e: any) => {
        e.preventDefault();
        const categoryToPost = {
            id: 0,
            name: newCategory.name
        }
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/categories`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(categoryToPost)
        })
        .then(response => {
            response.json(); 
        })
        .then(data => props.router.push('/categories'))
        .catch(rejected => {
            console.log(rejected);
        });
    };

    const handleChange = (e: any) => {
        setNewCategory({...newCategory, [e.target.name] : e.target.value})
    }

    return (
        <Container>
            <Typography variant="h5" color="textSecondary" gutterBottom>
                Add a Category
            </Typography>
            <div>
                <form onSubmit={submitCategory}>
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
                    <Link href="/categories">
                        <Typography>Go back to Categories</Typography>
                    </Link>
                </Button>
            </div>
        </Container>
    );
};
export default withRouter(NewCategory);