import {Box,  Link, Paper, Typography} from "@mui/material";
import { positions } from '@mui/system';
import React from "react";

export default function PrimaryButton(props:any){

    return (
             <Link color="inherit" href={props.link} style={{ textDecoration: 'none' }}>
            <Paper>
                <Box
					px={1}
                    py={2}
                    sx={{
                        display: "flex",
                        backgroundColor: "primary.light", 
                        color: "common.white",	
                        height: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        positions: "bottom"		
                    }}
				>
					<Typography variant="h6" align="center">{props.buttonText}</Typography>
				</Box>
            </Paper>
            </Link>
    )
}



