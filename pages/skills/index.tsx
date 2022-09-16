import Link from 'next/link';
import { Typography, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import LinkButton from '../../components/LinkButton';
import EntityCard from '../../components/EntityCard';

export default function Skills() {
    
    interface MySkills {
        id: number,
        name: string,
    }
    const [skills, setSkills] = useState<MySkills[]>([]);

    function getSkills(){
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/skills`)
        .then(response => response.json())
        .then(data => setSkills(data))
        .catch(rejected => {
            console.log(rejected);
        });
    };

    useEffect( () => {getSkills()},[]);

    
    return (
        <Container sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Typography variant="h4" color="primary" gutterBottom>
                SKILLS
            </Typography>
            {skills.length > 0 ? (
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="stretch"
                >
                    {skills.map(skill => {
                        return (
                            <Grid item xs={2} sm={4} md={4} key={skill.id}>
                                <EntityCard
                                    link={`skills/${skill.id}`}
                                    title={skill.name}
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
                    No skills here...☹️...yet!
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
                    buttonHref="/skills/add-skill"
                    buttonTitle="Create new skill"
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

