import React from 'react';
import { Typography, Box } from '@mui/material';

export default function PageTitle(props: any) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography
                variant="h5"
                color="primary"
                sx={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: 'common.black',
                }}
            >
                {props.title}
            </Typography>
        </Box>
    );
}
