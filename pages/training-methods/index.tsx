import Link from 'next/link';
import { Typography, Container, Grid, Card, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import LinkButton from '../../components/LinkButton';
import EntityCard from '../../components/EntityCard';

export default function TrainingMethods() {
    
    interface MyTrainingMethods {
        id: number,
        name: string,
        description: string
    }
    const [trainingMethods, setTrainingMethods] = useState<MyTrainingMethods[]>([]);

    function getTrainingMethods(){
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/training-methods`)
        .then(response => response.json())
        .then(data => setTrainingMethods(data))
        .catch(rejected => {
            console.log(rejected);
        });
    };

    useEffect( () => {getTrainingMethods()},[]);

    
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Typography variant="h4" color="primary" gutterBottom>
                TrainingMethods
            </Typography>
            {trainingMethods.length > 0 ? (
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    alignContent="stretch"
                    alignItems="stretch"
                >
                    {trainingMethods.map(trainingMethod => {
                        return (
                            <Grid
                                item xs={6} 
                                key={trainingMethod.id}
                            >
                                <EntityCard
                                    link={`training-methods/${trainingMethod.id}`}
                                    title={trainingMethod.name}
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
                    No Training Methods here...☹️...yet!
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
                    buttonHref="/training-methods/add-training-method"
                    buttonTitle="Create new Training Method"
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

