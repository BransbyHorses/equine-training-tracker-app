import { withRouter, NextRouter } from 'next/router';
import {
    Typography,
    Container,
    Grid,
    TextField,
    Autocomplete
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import LinkButton from '../../../components/LinkButton';
import EntityCard from '../../../components/EntityCard';
import AutoCompleteBox from '../../../components/AutoCompleteBox'
import PageTitle from '../../../components/PageTitle';

interface WithRouterProps {
    router: NextRouter;
}

interface MyComponentProps extends WithRouterProps {}

const Categories: React.FC<MyComponentProps> = props => {
    interface MyCategories {
        id: number;
        name: string;
    }
    const [categories, setCategories] = useState<MyCategories[]>([]);

    function getCategories() {
        fetch(`${process.env.NEXT_PUBLIC_URL}/data/categories`)
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(rejected => {
                console.log(rejected);
            });
    }

    useEffect(() => {
        getCategories();
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
				<PageTitle title={"Categories"} />

				<AutoCompleteBox
					options={categories.map((category) => ({
						optionName: category.name,
						optionId: category.id,
					}))}
					label="Search for a category"
					linkName={"categories"}
				/>

				{categories.length > 0 ? (
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
						{categories.map((category) => {
							return (
								<Grid item xs={2} sm={4} md={4} key={category.id}>
									<EntityCard
										link={`categories/${category.id}`}
										title={category.name}
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
						No categories here...☹️...yet!
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
						buttonHref="/admin/categories/add-category"
						buttonTitle="Create new category"
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
};

export default withRouter(Categories);
