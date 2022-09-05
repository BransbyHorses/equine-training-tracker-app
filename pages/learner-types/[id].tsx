import { Container, Box, Button, Link, Typography, Card, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { withRouter, NextRouter } from 'next/router'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface WithRouterProps {
    router: NextRouter
}

interface MyComponentProps extends WithRouterProps {}


const LearnerTypeId: React.FC<MyComponentProps> = (props) => {

    interface MyLearnerTypes {
        id: number;
        name: string;
    }
    const [learnerType, setLearnerType] = useState<MyLearnerTypes>({
        id: 0,
        name: 'string'
    });

    const router = useRouter();

    const getLearnerTypeFromId = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/learner-types/${router.query.id}`)
            .then(response => response.json())
            .then(data => setLearnerType(data))
            .catch(rejected => {
                console.log(rejected);
            });
    }

    const deleteLearnerTypeForever = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/learner-types/${router.query.id}`, {method: 'DELETE'} )
        .then(() => {
            router.push('/learner-types')
        })
        .catch(rejected => {
            console.log(rejected);
        });
    }

    useEffect(() => {
        getLearnerTypeFromId();
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
                        Learner Type: {learnerType.name}
                    </Typography>
                </Card>

                <Button
                    variant="outlined"
                    sx={{ my: '1rem' }}
                    onClick={deleteLearnerTypeForever}
                >
                    <DeleteForeverIcon />
                </Button>

                <Link href="/learner-types">
                    <Button variant="outlined" sx={{ my: '1rem' }}>
                        <Typography color="prima">
                            Go back to Learner Types
                        </Typography>
                    </Button>
                </Link>
            </Box>
        </Container>
    );
};

export default withRouter(LearnerTypeId);
