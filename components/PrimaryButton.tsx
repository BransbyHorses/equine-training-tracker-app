import {Box, Container, Link, Paper, Typography} from "@mui/material";
import React from "react";

export default function PrimaryButton(props:any){

    return (
        <Link 
            onClick={props.handleChange}
            color="inherit" 
           // href={props.link} 
            style={{ textDecoration: 'none' }}>
                <Box
                   className="fixed-button-bottom"

					px={1}
                    py={2}
                    sx={{
                        backgroundColor: "primary.light", 
                        color: "common.white",	
                        height: "10",
                    }}
				>

					<Typography 
                        variant="h6" 
                        align="center"
                        >
                    {props.buttonText}
                    </Typography>
				</Box>
            </Link>
    )
}



