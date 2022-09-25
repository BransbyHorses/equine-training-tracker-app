import Link from 'next/link';
import { Typography, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import LinkButton from '../../components/LinkButton';
import EntityCard from '../../components/EntityCard';
import AutoCompleteBox from '../../components/AutoCompleteBox';
import PageTitle from '../../components/PageTitle';

export default function Equines() {
    interface MyEquines {
        id: number;
        name: string;
        category: string;
        onHold: boolean;
        programme: string;
        skills: string;
        trainerId: number;
        training: string;
        yard: string;
    }
    const [equines, setEquines] = useState<MyEquines[]>([]);

    function getEquines() {
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines`)
            .then(response => response.json())
            .then(data => setEquines(data))
            .catch(rejected => {
                console.log(rejected);
            });
    }

    useEffect(() => {
        getEquines();
    }, []);

    return (
        <Container>
            <PageTitle title={'Equines'} />
            <AutoCompleteBox
                options={equines.map(equine => ({
                    optionName: equine.name,
                    optionId: equine.id
                }))}
                label="Search for an equine"
                linkName={'equines'}
            />
            {equines.length > 0 ? (
                <Grid
                    container
                    rowSpacing={4}
                    columnSpacing={{ xs: 2, sm: 2, md: 3 }}
                    spacing={{ xs: 4, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="stretch"
                    paddingBottom="20px"
                >
                    {equines.map(equine => {
                        return (
                            <Grid item xs={2} sm={4} md={4} key={equine.id}>
                                <EntityCard
                                    link={`equines/${equine.id}`}
                                    title={equine.name}
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
                    No equines here...☹️...yet!
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
                    buttonHref="/equines/add-equine"
                    buttonTitle="Create new equine"
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
