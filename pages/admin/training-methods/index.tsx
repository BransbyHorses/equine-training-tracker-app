import Link from 'next/link';
import { Typography, Container, Grid, Card, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import LinkButton from '../../../components/LinkButton';
import EntityCard from '../../../components/EntityCard';
import AutoCompleteBox from '../../../components/AutoCompleteBox';
import PageTitle from '../../../components/PageTitle';

export default function TrainingMethods() {
    interface MyTrainingMethods {
        id: number;
        name: string;
        description: string;
    }
    const [trainingMethods, setTrainingMethods] = useState<MyTrainingMethods[]>(
        []
    );

    function getTrainingMethods() {
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/training-methods`)
            .then(response => response.json())
            .then(data => setTrainingMethods(data))
            .catch(rejected => {
                console.log(rejected);
            });
    }

    useEffect(() => {
        getTrainingMethods();
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
				<PageTitle title={"Training Methods"} />
				<AutoCompleteBox
					options={trainingMethods.map((trainingMethod) => ({
						optionName: trainingMethod.name,
						optionId: trainingMethod.id,
					}))}
					label="Search for a training method"
					linkName={"trainingMethods"}
				/>
				{trainingMethods.length > 0 ? (
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
						{trainingMethods.map((trainingMethod) => {
							return (
								<Grid item xs={2} sm={4} md={4} key={trainingMethod.id}>
									<EntityCard
										link={`admin/training-methods/${trainingMethod.id}`}
										title={trainingMethod.name}
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
						No Training Methods here...☹️...yet!
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
						buttonHref="/admin/training-methods/add-training-method"
						buttonTitle="Create new Training Method"
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
