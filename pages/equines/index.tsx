import Link from 'next/link';
import {
    Button,
    Select,
    Typography,
    Container,
    TextField,
    MenuItem,
    Checkbox,
    FormControlLabel,
    FormControl,
    FormGroup,
    Grid,
    Card
} from '@mui/material';
import { useEffect, useState } from 'react';

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
            <div>
                {equines.map(equine => {
                    return (
                        <Card key={equine.id} raised sx={{ my: '1rem' }}>
                            <Typography
                                variant="h5"
                                color="#616161"
                                gutterBottom
                                sx={{ my: '1rem', mx: '1rem' }}
                            >
                                {equine.name}
                            </Typography>
                        </Card>
                    );
                })}
            </div>
            <Container>
                <Button color="primary" variant="contained">
                    <Link href="/" >
                        <Typography color='lightBlue[50]'>
                        Go to the homepage
                        </Typography>      
                    </Link>
                </Button>
                <Button>
                    <Link href="/equines/add-equine">
                        <a>Add a new equine</a>
                    </Link>
                </Button>
            </Container>
        </Container>
    );
}
