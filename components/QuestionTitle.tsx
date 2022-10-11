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
                    marginBottom: "35px"
                }}
            >
                {props.title}
            </Typography>
        </Box>
    );
}
