import { Container, Box, Button, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { keyframes } from 'styled-components';

export default function EquineId() {
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

    function getEquineFromId() {
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines/${router.query.id}`)
            .then(response => response.json())
            .then(data => setEquine(data))
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
                <Typography
                    variant="h5"
                    color="#616161"
                    gutterBottom
                    sx={{ my: '1rem', mx: '1rem' }}
                >
                    {equine.name}
                </Typography>

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
}
