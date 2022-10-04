import { Container, Box, Button, Link, Typography, Card, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { withRouter, NextRouter } from 'next/router'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LinkButton from '../../../components/LinkButton';

interface WithRouterProps {
    router: NextRouter
}

interface MyComponentProps extends WithRouterProps {}

const SkillId: React.FC<MyComponentProps> = (props) => {
    interface MySkill {
        id: number,
        name: string
      }
    const [skill, setSkill] = useState<MySkill>({
        id: 0,
        name: ""
      });

    const router = useRouter();

    const getSkillFromId = async () => {
        const skillId = await router.query.id;
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/skills/${skillId}`)
            .then(response => response.json())
            .then(data => setSkill(data))
            .catch(rejected => {
                console.log(rejected);
            });
    }

    const deleteSkillForever = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_URL}/data/skills/${skill.id}`, {method: 'DELETE'} )
        .then(() => {
            props.router.push("/admin/skills");
        })
        .catch(rejected => {
            console.log(rejected);
        });
    }

    useEffect(() => {
        getSkillFromId();
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
					<Card sx={{ my: "1rem", cursor: "pointer", borderRadius: "20px" }}>
						<Typography
							variant="h5"
							color="#616161"
							gutterBottom
							sx={{ my: "1rem", mx: "1rem" }}
						>
							Name: {skill.name}
						</Typography>
					</Card>

					<Button
						variant="outlined"
						sx={{ my: "1rem" }}
						onClick={deleteSkillForever}
					>
						<DeleteForeverIcon />
					</Button>

					<LinkButton
						buttonHref="/admin/skills"
						variant="contained"
						size="Large"
						color="white"
						action="Go back to Skills"
					/>
				</Box>
			</Container>
		);
};

export default withRouter(SkillId);
