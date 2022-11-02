import React from 'react';
import { Typography, Grid, Card, Button } from '@mui/material';
import Link from 'next/link';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function ListCard(props: any) {
    return (
        <Grid item xs={12}>
            <Card
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 'auto',
                    backgroundColor: 'common.white',
                    borderRadius: '0px',
                    boxShadow: 'none',
                    borderBottom: '1px solid #CAC9C9'
                }}
            >
                <Link href={props.link}>
                    <Button sx={{ textTransform: 'unset' }}>
                        <Typography
                            variant="h6"
                            color="info.main"
                            sx={{ fontWeight: '300', fontSize: '16px', textTransform: 'unset' }}
                        >
                            {props.title}
                        </Typography>
                    </Button>
                </Link>
                <Link href={props.link}>
                    <Button
                        variant="outlined"
                        sx={{ my: '2rem', margin: '0px', border: 'none', color: '#222853' }}
                        onClick={() => {}}
                    >
                        <KeyboardArrowRightIcon fontSize='large' />
                    </Button>
                </Link>
            </Card>
        </Grid>
    );
}
