import { Container, Box, Button, Link, Typography, Card, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { withRouter, NextRouter } from 'next/router'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LinkButton from '../../../components/LinkButton';
import PageTitle from '../../../components/PageTitle';

interface WithRouterProps {
    router: NextRouter
}

interface MyComponentProps extends WithRouterProps {}

const EquineId: React.FC<MyComponentProps> = (props) => {
    interface MyEquine {
        category: {
          id: number,
          name: string
        },
        id: number,
        name: string,
        programme: {
          id: number,
          name: string
        },
        skills: Array<any>,
        yard: {
          id: number,
          name: string
        }
      }
    const [equine, setEquine] = useState<MyEquine>({
        category: {
          id: 0,
          name: ""
        },
        id: 0,
        name: "",
        programme: {
          id: 0,
          name: ""
        },
        skills: [],
        yard: {
          id: 0,
          name: ""
        }
      });

    const router = useRouter();

    const getEquineFromId = async () => {
        const equineId = await props.router.query.id;
        
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines/${equineId}`)
            .then(response => response.json())
            .then(data => setEquine(data))
            .catch(rejected => {
                console.log(rejected);
            });
    }

    const deleteEquineForever = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/equines/${equine.id}`, {method: 'DELETE'} )
        .then(() => {
            props.router.push("/admin/equines");
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
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around",
						alignItems: "center",
					}}
				>
					<PageTitle title={equine.name} sx={{ justifySelf: "start" }} />
					<Card
						sx={{ my: "1rem", cursor: "pointer", borderRadius: "20px" }}
					></Card>
					<Card sx={{ my: "1rem", cursor: "pointer", borderRadius: "20px" }}>
						<Typography
							variant="h5"
							color="#616161"
							gutterBottom
							sx={{ my: "1rem", mx: "1rem" }}
						>
							Yard: {equine.yard.name}
						</Typography>
					</Card>

					<Button
						variant="outlined"
						sx={{ my: "1rem" }}
						onClick={deleteEquineForever}
					>
						<DeleteForeverIcon />
					</Button>

					<LinkButton
						buttonHref="/admin/equines"
						variant="contained"
						size="Large"
						color="white"
						action="Go back to equines"
					/>
				</Box>
			</Container>
		);
};

export default withRouter(EquineId);
