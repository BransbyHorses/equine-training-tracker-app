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

const YardId: React.FC<MyComponentProps> = (props) => {
    interface MyYard {
        id: number,
        name: string
      }
    const [yard, setYard] = useState<MyYard>({
        id: 0,
        name: ""
      });

    const router = useRouter();

    const getYardFromId = async () => {
        const yardId = await router.query.id;
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/yards/${yardId}`)
            .then(response => response.json())
            .then(data => setYard(data))
            .catch(rejected => {
                console.log(rejected);
            });
    }

    const deleteYardForever = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/yards/${yard.id}`, {method: 'DELETE'} )
        .then(() => {
            props.router.push('/yards')
        })
        .catch(rejected => {
            console.log(rejected);
        });
    }

    useEffect(() => {
        getYardFromId();
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
                        Name: {yard.name}
                    </Typography>
                </Card>

                <Button
                    variant="outlined"
                    sx={{ my: '1rem' }}
                    onClick={deleteYardForever}
                >
                    <DeleteForeverIcon />
                </Button>

                <LinkButton
                    buttonHref="/yards"
                    variant="contained"
                    size="Large"
                    color="white"
                    action="Go back to Yards"
                />
            </Box>
        </Container>
    );
};

export default withRouter(YardId);