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
    router: NextRouter
}

interface MyComponentProps extends WithRouterProps {}

const AddEnvironments: React.FC<MyComponentProps> = (props) => {

    const [environment, setEnvironment] = useState({
        name: '',
    });

    const submitEnvironment = (e: any) => {
        e.preventDefault();
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/environments`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(environment)
        })
        .then(response => response.json())
        .then(data => props.router.push(`/admin/environments/${data.id}`))
        .catch(rejected => {
            console.log(rejected);
        });
    };

    const handleChange = (e: any) => {
        setEnvironment({...environment, [e.target.name] : e.target.value})
    }
    
    return (
			<Container>
				<Typography variant="h5" color="textSecondary" gutterBottom>
					Add an Environment
				</Typography>
				<div>
					<form onSubmit={submitEnvironment}>
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
						<Link href="/admin/environments">
							<Typography>Go back to Environment</Typography>
						</Link>
					</Button>
				</div>
			</Container>
		);
};
export default withRouter(AddEnvironments);