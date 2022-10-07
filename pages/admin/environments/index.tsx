import Link from 'next/link';
import { Typography, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import LinkButton from '../../../components/LinkButton';
import EntityCard from '../../../components/EntityCard';
import AutoCompleteBox from '../../../components/AutoCompleteBox';

export default function Environments() {
	interface MyEnvironments {
		id: number;
		name: string;
	}
	const [environments, setEnvironment] = useState<MyEnvironments[]>([]);

	function getEnvironments() {
		fetch(`${process.env.NEXT_PUBLIC_URL}/data/environments`)
			.then((response) => response.json())
			.then((data) => setEnvironment(data))
			.catch((rejected) => {
				console.log(rejected);
			});
	}

	useEffect(() => {
		getEnvironments();
	}, []);

	return (
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Typography variant="h4" color="primary" gutterBottom>
				ENVIRONMENTS
			</Typography>
			<AutoCompleteBox
				options={environments.map((environment) => ({
					optionName: environment.name,
					optionId: environment.id,
				}))}
				label="Search for a environment"
				linkName={"environments"}
			/>
			{environments.length > 0 ? (
				<Grid
					container
					rowSpacing={4}
					columnSpacing={{ xs: 2, sm: 2, md: 3 }}
					spacing={{ xs: 4, md: 3 }}
					columns={{ xs: 4, sm: 8, md: 12 }}
					direction="row"
					justifyContent="space-evenly"
					alignItems="stretch"
					paddingBottom="20px"
				>
					{environments.map((environment) => {
						return (
							<Grid item xs={2} sm={4} md={4} key={environment.id}>
								<EntityCard
									link={`admin/environments/${environment.id}`}
									title={environment.name}
								/>
							</Grid>
						);
					})}
				</Grid>
			) : (
				<Typography
					variant="h5"
					color="#616161"
					gutterBottom
					sx={{ my: "1rem", mx: "1rem" }}
				>
					No environments here...☹️...yet!
				</Typography>
			)}

			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-around",
				}}
			>
				<LinkButton
					color="lightBlue[50]"
					variant="contained"
					buttonHref="/admin/environments/add-environment"
					buttonTitle="Create new environment"
				></LinkButton>

				<LinkButton
					color="lightBlue[50]"
					variant="contained"
					buttonHref="/admin"
					buttonTitle="Back to Dashboard"
				></LinkButton>
			</Box>
		</Container>
	);
}
