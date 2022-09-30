import { Container, Box, Button, Typography, Card } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { withRouter, NextRouter } from 'next/router';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LinkButton from '../../components/LinkButton';

interface WithRouterProps {
    router: NextRouter
}

interface MyComponentProps extends WithRouterProps {}

const CategoryId: React.FC<MyComponentProps> = (props) => {
    interface MyCategory {
        id: number,
        name: string
      }
    const [category, setCategory] = useState<MyCategory>({
        id: 0,
        name: ""
      });

    const router = useRouter();

    const getCategoryFromId = async () => {
        const categoryId = await router.query.id;
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/categories/${categoryId}`)
            .then(response => response.json())
            .then(data => setCategory(data))
            .catch(rejected => {
                console.log(rejected);
            });
    }

    const deleteCategoryForever = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/categories/${category.id}`, {method: 'DELETE'} )
        .then(() => {
            props.router.push('/categories')
        })
        .catch(rejected => {
            console.log(rejected);
        });
    }

    useEffect(() => {
        getCategoryFromId();
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
                        Name: {category.name}
                    </Typography>
                </Card>

                <Button
                    variant="outlined"
                    sx={{ my: '1rem' }}
                    onClick={deleteCategoryForever}
                >
                    <DeleteForeverIcon />
                </Button>

                <LinkButton
                    buttonHref="/categories"
                    variant="contained"
                    size="Large"
                    color="white"
                    action="Go back to Categories"
                />
            </Box>
        </Container>
    );
};

export default withRouter(CategoryId);
