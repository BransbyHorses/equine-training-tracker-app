import { Grid } from '@mui/material';
import DashboardCard from './DashboardCard';
import ListCard from './ListCard';

const InfoGrid = (props: any) => {
    const listItems = props.listItems;
    return (
        <Grid
            container
            rowSpacing={4}
            columnSpacing={{ xs: 2, sm: 2, md: 3 }}
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
