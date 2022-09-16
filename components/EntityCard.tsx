import Link from 'next/link';
import {
    Button,
    Typography,
    Container,
    Card
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';

export default function EntityCard(props: any){
    return(
        <Card
        raised
        sx={{ my: '1rem', cursor: 'pointer' }}
    >
        <Link href={`${props.link}`}>
            <Typography
                variant="h5"
                color="#616161"
                gutterBottom
                sx={{ my: '1rem', mx: '1rem' }}
            >
                {props.title}
            </Typography>
        </Link>
    </Card>
    )
};
