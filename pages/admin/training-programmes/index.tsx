import Link from 'next/link';
import { Typography, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import LinkButton from '../../../components/LinkButton';
import EntityCard from '../../../components/EntityCard';
import AutoCompleteBox from '../../../components/AutoCompleteBox';

export default function Programmes() {
    interface MyProgrammes {
        id: number;
        name: string;
    }
    const [programmes, setProgrammes] = useState<MyProgrammes[]>([]);

    function getProgrammes() {
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/programmes`)
            .then(response => response.json())
            .then(data => setProgrammes(data))
            .catch(rejected => {
                console.log(rejected);
            });
    }

    useEffect(() => {
        getProgrammes();
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
					Programmes
				</Typography>
				<AutoCompleteBox
					options={programmes.map((programme) => ({
						optionName: programme.name,
						optionId: programme.id,
					}))}
					label="Search for a programme"
					linkName={"programmes"}
				/>
				{programmes.length > 0 ? (
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
						{programmes.map((programme) => {
							return (
								<Grid item xs={2} sm={4} md={4} key={programme.id}>
									<EntityCard
										link={`admin/programmes/${programme.id}`}
										title={programme.name}
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
						No Programmes here...☹️...yet!
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
						buttonHref="/admin/programmes/add-programme"
						buttonTitle="Create new Programme"
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
