import { Container, Box, Button, Link, Typography, Card, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { withRouter, NextRouter } from 'next/router'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LinkButton from '../../../components/LinkButton';

interface WithRouterProps {
    router: NextRouter
}

interface MyComponentProps extends WithRouterProps {}

const ProgrammeId: React.FC<MyComponentProps> = (props) => {
    interface MyProgramme {
        id: number,
        name: string
      }
    const [programme, setProgramme] = useState<MyProgramme>({
        id: 0,
        name: ""
      });

    const router = useRouter();

    const getProgrammeFromId = async () => {
        const programmeId = await router.query.id;
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/programmes/${programmeId}`)
            .then(response => response.json())
            .then(data => setProgramme(data))
            .catch(rejected => {
                console.log(rejected);
            });
    }

    const deleteProgrammeForever = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/programmes/${programme.id}`, {method: 'DELETE'} )
        .then(() => {
            props.router.push('/programmes')
        })
        .catch(rejected => {
            console.log(rejected);
        });
    }

    useEffect(() => {
        getProgrammeFromId();
    }, []);
    

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}
            >
                <Card
                    sx={{ my: '1rem', cursor: 'pointer', borderRadius: '20px' }}
                >
                    <Typography
                        variant="h5"
                        color="#616161"
                        gutterBottom
                        sx={{ my: '1rem', mx: '1rem' }}
                    >
                        Name: {programme.name}
                    </Typography>
                </Card>

                <Button
                    variant="outlined"
                    sx={{ my: '1rem' }}
                    onClick={deleteProgrammeForever}
                >
                    <DeleteForeverIcon />
                </Button>

                <LinkButton
                    buttonHref="/programmes"
                    variant="contained"
                    size="Large"
                    color="white"
                    action="Go back to Programmes"
                />
            </Box>
        </Container>
    );
};

export default withRouter(ProgrammeId);
