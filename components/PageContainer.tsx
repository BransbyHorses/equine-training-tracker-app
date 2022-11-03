import React from 'react';

type MyComponentProps = React.PropsWithChildren<{}>;


import { Container } from '@mui/material';


export default function PageContainer({ children, ...props}: MyComponentProps) {

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