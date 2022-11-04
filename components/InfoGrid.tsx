import { Grid } from "@mui/material";
import NavigationCard from "./NavigationCard";

const InfoGrid = (props: any) => {
	const listItems = props.listItems;
	return (
		<Grid
			container
			rowSpacing={3}
			columnSpacing={{ sm: 1, md: 2 }}
			alignContent="stretch"
			alignItems="stretch"
		>
			{listItems.map((listItem: any, index: number) => {
				return (
					<NavigationCard
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
