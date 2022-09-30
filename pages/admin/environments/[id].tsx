import { Container, Box, Button, Link, Typography, Card, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { withRouter, NextRouter } from 'next/router'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface WithRouterProps {
    router: NextRouter
}

interface MyComponentProps extends WithRouterProps {}


const EnvironmentId: React.FC<MyComponentProps> = (props) => {

    interface MyEnvironments {
        id: number;
        name: string;
    }
    const [environment, setEnvironment] = useState<MyEnvironments>({
        id: 0,
        name: 'string'
    });

    const router = useRouter();

    const getEnvironmentFromId = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/environments/${router.query.id}`)
            .then(response => response.json())
            .then(data => setEnvironment(data))
            .catch(rejected => {
                console.log(rejected);
            });
    }

    const deleteEnvironmentForever = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/environments/${router.query.id}`, {method: 'DELETE'} )
        .then(() => {
            router.push('/environments')
        })
        .catch(rejected => {
            console.log(rejected);
        });
    }

    useEffect(() => {
        getEnvironmentFromId();
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
                        Environment: {environment.name}
                    </Typography>
                </Card>

                <Button
                    variant="outlined"
                    sx={{ my: '1rem' }}
                    onClick={deleteEnvironmentForever}
                >
                    <DeleteForeverIcon />
                </Button>

                <Link href="/environments">
                    <Button variant="outlined" sx={{ my: '1rem' }}>
                        <Typography color="prima">
                            Go back to Environments
                        </Typography>
                    </Button>
                </Link>
            </Box>
        </Container>
    );
};

export default withRouter(EnvironmentId);
