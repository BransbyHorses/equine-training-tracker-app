import React from 'react';
import { Typography, Grid, Card, Button } from '@mui/material';
import Link from 'next/link';

export default function DashboardCard(props: any) {
    return (
        <Grid item xs={6}>
            <Card
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100px',
                    backgroundColor: 'primary.light'
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