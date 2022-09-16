import React, { FC } from 'react';
import { withRouter, NextRouter } from 'next/router';
import { Typography, Container, Grid, Card, Button } from '@mui/material';
import options from '../../properties/properties';
import Link from 'next/link';

interface WithRouterProps {
    router: NextRouter;
}

const adminActions = options.adminActions;

interface MyComponentProps extends WithRouterProps {}

const adminDashboard: FC<MyComponentProps> = props => {
    return (
        <Container>
            <Typography variant="h3" color="textSecondary" gutterBottom>
                Dashboard
            </Typography>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                alignContent="stretch"
                alignItems="stretch"
            >
                {adminActions.map((action, index) => {
                    return (
                        <Grid item xs={6} key={index} >
                            <Card sx={{display: "flex", alignItems: "center", justifyContent: "center", height:'100%'}}>
                                <Link href={action.link}>
                                    <Button>
                                        <Typography
                                            variant="h6"
                                            color="primary"
                                        >
                                            {action.title}
                                        </Typography>
                                    </Button>
                                </Link>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};

export default withRouter(adminDashboard);

