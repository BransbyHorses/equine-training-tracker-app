import React from 'react';
import { Container } from '@mui/material';


export default function PageContainer({ children, ...pageProps }) {

    return (
        <Container
        sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch",
        }}
        >
           {children} 
        </Container>
    )
}