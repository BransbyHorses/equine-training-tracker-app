import { Grid } from '@mui/material';
import ListCard from './ListCard';

const ListGrid = (props: any) => {
    const listItems = props.listItems;
    return (
        <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        direction="column"
        justifyContent="space-evenly"
        alignItems="stretch"
        paddingBottom="20px"
        paddingTop="0px"
        marginTop="0px"
    >
        {listItems.map((listItem: any) => {
            return (
                <Grid item xs={2} sm={4} md={4} sx={{ padding: "0px"}} key={listItem.id}>
                    <ListCard
                        link={`${props.listUrl}/${listItem.id}`}
                        title={listItem.name}
                    />
                </Grid>
            );
        })}
    </Grid>
    );
};
export default ListGrid;
