import Link from 'next/link';
import { Typography, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import LinkButton from '../../components/LinkButton';
import EntityCard from '../../components/EntityCard';

export default function Yards() {
    
    interface MyYards {
        id: number,
        name: string,
    }
    const [yards, setYards] = useState<MyYards[]>([]);

    function getYards(){
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/yards`)
        .then(response => response.json())
        .then(data => setYards(data))
        .catch(rejected => {
            console.log(rejected);
        });
    };

    useEffect( () => {getYards()},[]);

    
    return (
        <Container sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Typography variant="h4" color="primary" gutterBottom>
                YARDS
            </Typography>
            {yards.length > 0 ? (
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="stretch"
                >
                    {yards.map(yard => {
                        return (
                            <Grid item xs={2} sm={4} md={4} key={yard.id}>
                                <EntityCard
                                    link={`yards/${yard.id}`}
                                    title={yard.name}
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
                    No yards here...☹️...yet!
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
                    buttonHref="/yards/add-yard"
                    buttonTitle="Create new yard"
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

