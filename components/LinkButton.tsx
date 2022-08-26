import React from 'react';
import Link from 'next/link';
import { Button, Typography } from '@mui/material';

const LinkButton = (props: any) => {
    return (
        <Link href={props.buttonHref} passHref>
            <Button
                variant={props.variant}
                size={props.size}
                sx={{
                    margin: "5px 20px"
                }}
            >
                <Typography color={props.color ? props.color : null}>{props.action} {props.buttonTitle}</Typography>
            </Button>
        </Link>
    );
};
export default LinkButton;