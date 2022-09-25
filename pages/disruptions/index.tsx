import Link from 'next/link';
import { Typography, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import LinkButton from '../../components/LinkButton';
import EntityCard from '../../components/EntityCard';
import AutoCompleteBox from '../../components/AutoCompleteBox';
import PageTitle from '../../components/PageTitle';

export default function Disruptions() {
    interface MyDisruptions {
        id: number;
        name: string;
    }
    const [disruptions, setDisruptions] = useState<MyDisruptions[]>([]);

    function getDisruptions() {
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/disruptions`)
            .then(response => response.json())
            .then(data => setDisruptions(data))
            .catch(rejected => {
                console.log(rejected);
            });
    }

    useEffect(() => {
        getDisruptions();
    }, []);

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <PageTitle title={'Disruptions'} />
            <AutoCompleteBox
                options={disruptions.map(disruption => ({
                    optionName: disruption.name,
                    optionId: disruption.id
                }))}
                label="Search for a disruption"
                linkName={'disruptions'}
            />
            {disruptions.length > 0 ? (
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
                    {disruptions.map(disruption => {
                        return (
                            <Grid item xs={2} sm={4} md={4} key={disruption.id}>
                                <EntityCard
                                    link={`disruptions/${disruption.id}`}
                                    title={disruption.name}
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
                    No Disruptions here...☹️...yet!
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
                    buttonHref="/disruptions/add-disruption"
                    buttonTitle="Create new disruption"
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
