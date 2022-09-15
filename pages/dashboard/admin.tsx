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

const adminDashboard: FC <MyComponentProps> = props => {
    return (
        <Container>
            <Typography variant="h3" color="textSecondary" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={6}>
                {adminActions.map((action, index) => {
                    return (
                        <Grid item xs={12} key={index}>
                            <Card>
                                <Grid container direction={'column'}>
                                    <Link href={action.link}>
                                        <Button>
                                            <Typography
                                                variant="h5"
                                                color="primary"
                                            >
                                                {action.title}
                                            </Typography>
                                        </Button>
                                    </Link>
                                </Grid>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
};

export default withRouter(adminDashboard);
