import Link from 'next/link';
import { Typography, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import LinkButton from '../../components/LinkButton';
import EntityCard from '../../components/EntityCard';

export default function Categories() {
    
    interface MyCategories {
        id: number,
        name: string,
    }
    const [categories, setCategories] = useState<MyCategories[]>([]);

    function getCategories(){
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/categories`)
        .then(response => response.json())
        .then(data => setCategories(data))
        .catch(rejected => {
            console.log(rejected);
        });
    };

    useEffect( () => {getCategories()},[]);

    
    return (
        <Container sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Typography variant="h4" color="primary" gutterBottom>
                CATEGORIES
            </Typography>
            {categories.length > 0 ? (
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="stretch"
                >
                    {categories.map(category => {
                        return (
                            <Grid item xs={2} sm={4} md={4} key={category.id}>
                                <EntityCard
                                    link={`categories/${category.id}`}
                                    title={category.name}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            ) : (
                <Typography
                    variant="h5"
                    color="#616161"
                    gutterBottom
                    sx={{ my: '1rem', mx: '1rem' }}
                >
                    No categories here...☹️...yet!
                </Typography>
            )}

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                }}
            >
                <LinkButton
                    color="lightBlue[50]"
                    variant="contained"
                    buttonHref="/categories/add-category"
                    buttonTitle="Create new category"
                ></LinkButton>

                <LinkButton
                    color="lightBlue[50]"
                    variant="contained"
                    buttonHref="/dashboard/admin"
                    buttonTitle="Back to Dashboard"
                ></LinkButton>
            </Box>
        </Container>
    );
}

