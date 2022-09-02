import Link from 'next/link';
import {
    Button,
    Typography,
    Container,
    Card
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';

export default function Equines() {
    
    interface MyEquines {
        id: number,
        name: string,
        category: string,
        onHold: boolean,
        programme: string,
        skills: string,
        trainerId: number,
        training: string,
        yard: string
    }
    const [equines, setEquines] = useState<MyEquines[]>([]);

    function getEquines(){
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines`)
        .then(response => response.json())
        .then(data => setEquines(data))
        .catch(rejected => {
            console.log(rejected);
        });
    };

    useEffect( () => {getEquines()},[]);

    
    return (
        <Container>
            <Typography variant="h3" color="textSecondary" gutterBottom>
                Bransby Equines
            </Typography>
            {equines.length > 0 ? (
                <div>
                    {equines.map(equine => {
                        return (
                            <Card key={equine.id} raised sx={{ my: '1rem', cursor: 'pointer' }}>
                                <Link href={`equines/${equine.id}`}>
                                    <Typography
                                        variant="h5"
                                        color="#616161"
                                        gutterBottom
                                        sx={{ my: '1rem', mx: '1rem' }}
                                    >
                                        {equine.name}
                                    </Typography>
                                </Link>
                            </Card>
                        );
                    })}
                </div>
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
                    justifyContent: 'space-around'
                }}
            >
                <Button color="primary" variant="contained">
                    <Link href="/equines/add-equine">
                        <Typography color="lightBlue[50]">
                            Create new equine
                        </Typography>
                    </Link>
                </Button>
            </Box>
        </Container>
    );
}
