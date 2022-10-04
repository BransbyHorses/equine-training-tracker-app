import React, {useState} from 'react';
import { withRouter, NextRouter } from 'next/router';
import Link from 'next/link';
import {
    Button,
    Typography,
    Container,
    TextField,
    Grid
} from '@mui/material';

interface WithRouterProps {
    router: NextRouter;
}

interface MyComponentProps extends WithRouterProps {}

const NewSkill: React.FC<MyComponentProps> = props => {

    const [newSkill, setNewSkill] = useState({
        name: '',
    });

    const submitSkill = (e: any) => {
        e.preventDefault();
        const skillToPost = {
            id: 0,
            name: newSkill.name
        }
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/skills`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(skillToPost),
				})
					.then((response) => {
						response.json();
					})
					.then((data) => props.router.push("/admin/skills"))
					.catch((rejected) => {
						console.log(rejected);
					});
    };

    const handleChange = (e: any) => {
        setNewSkill({...newSkill, [e.target.name] : e.target.value})
    }

    return (
			<Container>
				<Typography variant="h5" color="textSecondary" gutterBottom>
					Add a Skill
				</Typography>
				<div>
					<form onSubmit={submitSkill}>
						<Grid container direction="column">
							<TextField
								id="name"
								label="Name"
								variant="outlined"
								color="secondary"
								name="name"
								onChange={handleChange}
								required
								sx={{ my: "1rem" }}
							/>
							<Button variant="contained" type="submit">
								Submit
							</Button>
						</Grid>
					</form>
				</div>
				<div>
					<Button variant="outlined" sx={{ my: "1rem" }}>
						<Link href="/admin/skills">
							<Typography>Go back to Skills</Typography>
						</Link>
					</Button>
				</div>
			</Container>
		);
};
export default withRouter(NewSkill);