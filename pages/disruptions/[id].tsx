import { Container, Box, Button, Link, Typography, Card, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { withRouter, NextRouter } from 'next/router'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LinkButton from '../../components/LinkButton';

interface WithRouterProps {
    router: NextRouter
}

interface MyComponentProps extends WithRouterProps {}

const DisruptionId: React.FC<MyComponentProps> = (props) => {
    interface MyDisruption {
        id: number,
        name: string
      }
    const [disruption, setDisruption] = useState<MyDisruption>({
        id: 0,
        name: ""
      });

    const router = useRouter();

    const getDisruptionFromId = async () => {
        const disruptionId = await router.query.id;
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/disruptions/${disruptionId}`)
            .then(response => response.json())
            .then(data => setDisruption(data))
            .catch(rejected => {
                console.log(rejected);
            });
    }

    const deleteDisruptionForever = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/disruptions/${disruption.id}`, {method: 'DELETE'} )
        .then(() => {
            props.router.push('/disruptions')
        })
        .catch(rejected => {
            console.log(rejected);
        });
    }

    useEffect(() => {
        getDisruptionFromId();
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
                        Name: {disruption.name}
                    </Typography>
                </Card>

                <Button
                    variant="outlined"
                    sx={{ my: '1rem' }}
                    onClick={deleteDisruptionForever}
                >
                    <DeleteForeverIcon />
                </Button>

                <LinkButton
                    buttonHref="/disruptions"
                    variant="contained"
                    size="Large"
                    color="white"
                    action="Go back to Disruptions"
                />
            </Box>
        </Container>
    );
};

export default withRouter(DisruptionId);
