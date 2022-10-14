import { Grid } from "@mui/material";
import DashboardCard from "./DashboardCard";

const InfoGrid = (props: any) => {
	const listItems = props.listItems;
	return (
		<Grid
			container
			rowSpacing={4}
			columnSpacing={{ xs: 2, sm: 1, md: 2 }}
			alignContent="stretch"
			alignItems="stretch"
		>
			{listItems.map((listItem: any, index: number) => {
				return (
					<DashboardCard
						key={index}
						link={listItem.link}
						title={listItem.title}
					/>
				);
			})}
		</Grid>
	);
};
export default InfoGrid;
