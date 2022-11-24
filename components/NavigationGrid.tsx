import { Grid } from "@mui/material";

const NavigationGrid = (props: any) => {
	return (
		<Grid container rowSpacing={3} columnSpacing={2}>
			{props.children}
		</Grid>
	);
};
export default NavigationGrid;
