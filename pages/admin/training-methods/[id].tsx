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

const TrainingMethodId: React.FC<MyComponentProps> = (props) => {
    interface MyTrainingMethod {
        id: number,
        name: string
      }
    const [trainingMethod, setTrainingMethod] = useState<MyTrainingMethod>({
        id: 0,
        name: ""
      });

    const router = useRouter();

    const getTrainingMethodFromId = async () => {
        const trainingMethodId = await router.query.id;
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/training-methods/${trainingMethodId}`)
            .then(response => response.json())
            .then(data => setTrainingMethod(data))
            .catch(rejected => {
                console.log(rejected);
            });
    }

    const deleteTrainingMethodForever = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/training-methods/${trainingMethod.id}`, {method: 'DELETE'} )
        .then(() => {
            props.router.push('/training-methods')
        })
        .catch(rejected => {
            console.log(rejected);
        });
    }

    useEffect(() => {
        getTrainingMethodFromId();
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
                        Name: {trainingMethod.name}
                    </Typography>
                </Card>

                <Button
                    variant="outlined"
                    sx={{ my: '1rem' }}
                    onClick={deleteTrainingMethodForever}
                >
                    <DeleteForeverIcon />
                </Button>

                <LinkButton
                    buttonHref="/training-methods"
                    variant="contained"
                    size="Large"
                    color="white"
                    action="Go back to TrainingMethods"
                />
            </Box>
        </Container>
    );
};

export default withRouter(TrainingMethodId);