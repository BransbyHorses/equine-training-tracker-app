import Link from 'next/link';
import {
    Button,
    Typography,
    Container,
    Card
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';

export default function LearnerTypes() {
    
    interface MyLearnerTypes {
        id: number,
        name: string,
    }
    const [learnerTypes, setLearnerType] = useState<MyLearnerTypes[]>([]);

    function getLearnerTypes(){
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/learner-types`)
        .then(response => response.json())
        .then(data => setLearnerType(data))
        .catch(rejected => {
            console.log(rejected);
        });
    };

    useEffect( () => {getLearnerTypes()},[]);

    
    return (
        <Container>
            <Typography variant="h3" color="textSecondary" gutterBottom>
                Bransby Equines
            </Typography>
            {learnerTypes.length > 0 ? (
                <div>
                    {learnerTypes.map(learnerType => {
                        return (
                            <Card key={learnerType.id} raised sx={{ my: '1rem', cursor: 'pointer' }}>
                                <Link href={`learner-types/${learnerType.id}`}>
                                    <Typography
                                        variant="h5"
                                        color="#616161"
                                        gutterBottom
                                        sx={{ my: '1rem', mx: '1rem' }}
                                    >
                                        {learnerType.name}
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
                No Learner Types here...☹️!
            </Typography>
            )}

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-around'
                }}
            >
                <Button color="primary" variant="contained">
                    <Link href="/learner-types/add-learner-type">
                        <Typography color="lightBlue[50]">
                            Create new Learner Type
                        </Typography>
                    </Link>
                </Button>

                <Button color="primary" variant="contained">
                    <Link href="/dashboard/admin">
                        <Typography color="lightBlue[50]">
                            Back to Dashboard
                        </Typography>
                    </Link>
                </Button>
            </Box>
        </Container>
    );
}
