import React from 'react';
import { Typography, Grid, Card, Button } from '@mui/material';
import Link from 'next/link';

export default function DashboardCard(props: any) {
    return (
        <Grid item xs={12} sm={6}>
            <Card
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '75px',
                    backgroundColor: 'primary.light',
                    borderRadius: '0px'
                }}
            >
                <Link href={props.link}>
                    <Button>
                        <Typography variant="h6" color="common.white">
                            {props.title}
                        </Typography>
                    </Button>
                </Link>
            </Card>
        </Grid>
    );
}