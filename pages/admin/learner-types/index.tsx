import Link from 'next/link';
import { Button, Typography, Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import LinkButton from '../../../components/LinkButton';
import EntityCard from '../../../components/EntityCard';
import AutoCompleteBox from '../../../components/AutoCompleteBox';

export default function LearnerTypes() {
    interface MyLearnerTypes {
        id: number;
        name: string;
    }
    const [learnerTypes, setLearnerType] = useState<MyLearnerTypes[]>([]);

    function getLearnerTypes() {
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/learner-types`)
            .then(response => response.json())
            .then(data => setLearnerType(data))
            .catch(rejected => {
                console.log(rejected);
            });
    }

    useEffect(() => {
        getLearnerTypes();
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
            <Typography variant="h4" color="primary" gutterBottom>
                LEARNER TYPES
            </Typography>
            <AutoCompleteBox
                options={learnerTypes.map(learnerType => ({
                    optionName: learnerType.name,
                    optionId: learnerType.id
                }))}
                label="Search for a learner type"
                linkName={'learner-types'}
            />
            {learnerTypes.length > 0 ? (
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
                    {learnerTypes.map(learnerType => {
                        return (
                            <Grid
                                item
                                xs={2}
                                sm={4}
                                md={4}
                                key={learnerType.id}
                            >
                                <EntityCard
                                    link={`learner-types/${learnerType.id}`}
                                    title={learnerType.name}
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
                    No Learner Types here...☹️!
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
                    buttonHref="/learner-types/add-learner-type"
                    buttonTitle="Create new Learner Type"
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
