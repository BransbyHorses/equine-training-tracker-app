import React, { FC } from 'react';
import { withRouter, NextRouter } from 'next/router';
import { Typography, Container, Grid, Card, Button } from '@mui/material';
import options from '../../properties/properties';
import Link from 'next/link';

import DashboardCard from '../../components/DashboardCard';
import PageTitle from '../../components/PageTitle';
import InfoGrid from '../../components/InfoGrid';

interface WithRouterProps {
    router: NextRouter;
}

const adminActions = options.adminActions;

interface MyComponentProps extends WithRouterProps {}

const adminDashboard: FC<MyComponentProps> = props => {
    return (
        <Container sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <PageTitle title={'Dashboard'}/>
            <InfoGrid listItems={adminActions}/> 
        </Container>
    );
};

export default withRouter(adminDashboard);

