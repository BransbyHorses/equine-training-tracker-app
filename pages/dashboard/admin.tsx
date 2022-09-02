import React, { FC } from 'react';
import { withRouter, NextRouter } from 'next/router';
import { Typography, Container, Grid, Card } from '@mui/material';
import options from '../../properties/properties';
import LinkButton from '../../components/LinkButton';

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
                        <Grid item xs={6} key={index}>
                            <Card>
                                <Typography
                                    variant="h5"
                                    color="primary"
                                    gutterBottom
                                >
                                    {action.title}
                                </Typography>
                                <Grid container direction={'column'}>
                                    <LinkButton
                                        buttonHref={action.newLink}
                                        buttonTitle={action.buttonTitle}
                                        action="Add New"
                                        variant={action.newVariant}
                                        size={action.newSize}
                                    />
                                    <LinkButton
                                        buttonHref={action.editLink}
                                        buttonTitle={action.buttonTitle}
                                        action="Edit"
                                        variant={action.editVariant}
                                        size={action.editSize}
                                    />
                                    <LinkButton
                                        buttonHref={action.deleteLink}
                                        buttonTitle={action.buttonTitle}
                                        action="Delete"
                                        variant={action.deleteVariant}
                                        size={action.deleteSize}
                                        color="red"
                                    />
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
