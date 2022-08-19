import { Container, Box, Button, Link, Typography, Card, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { withRouter, NextRouter } from 'next/router'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface WithRouterProps {
    router: NextRouter
}

interface MyComponentProps extends WithRouterProps {}

const EquineId: React.FC<MyComponentProps> = (props) => {
    interface MyEquine {
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
    const [equine, setEquine] = useState<MyEquine>({
        id: 0,
        name: 'string',
        category: 'string',
        onHold: false,
        programme: '',
        skills: '',
        trainerId: 0,
        training: '',
        yard: ''
    });

    const router = useRouter();

    const getEquineFromId = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines/${router.query.id}`)
            .then(response => response.json())
            .then(data => setEquine(data))
            .catch(rejected => {
                console.log(rejected);
            });
    }

    const deleteEquineForever = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines/${router.query.id}`, {method: 'DELETE'} )
        .then(response => response.json())
        .then(() => {
            router.push('/equines')
        })
        .catch(rejected => {
            console.log(rejected);
        });
    }

    useEffect(() => {
        getEquineFromId();
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
                        Name: {equine.name}
                    </Typography>
                </Card>
                <Card
                    sx={{ my: '1rem', cursor: 'pointer', borderRadius: '20px' }}
                >
                    <Typography
                        variant="h5"
                        color="#616161"
                        gutterBottom
                        sx={{ my: '1rem', mx: '1rem' }}
                    >
                        Yard: {equine.yard}
                    </Typography>
                </Card>

                {equine.onHold ? (
                    <Card
                        sx={{
                            my: '1rem',
                            cursor: 'pointer',
                            borderRadius: '20px'
                        }}
                    >
                        <Typography
                            variant="h5"
                            color="#616161"
                            gutterBottom
                            sx={{ my: '1rem', mx: '1rem' }}
                        >
                            This Equine is currently on hold.
                        </Typography>
                    </Card>
                ) : null}

                <Button variant="outlined" sx={{ my: '1rem' }} onClick={deleteEquineForever}>
                    <DeleteForeverIcon />
                </Button>

                <Button variant="outlined" sx={{ my: '1rem' }}>
                    <Link href="/equines">
                        <Typography color="prima">
                            Go back to Equines
                        </Typography>
                    </Link>
                </Button>
            </Box>
        </Container>
    );
};

export default withRouter(EquineId);
