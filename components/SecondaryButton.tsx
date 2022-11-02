import {Box, Grid, Link, Paper, Typography} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import React from "react";

export default function SecondaryButton(props:any){

    return (
        <Grid item xs={12} sm={6}>
            <Paper>
                <Box
                    px={2}
                    py={2}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h6">{props.buttonText}</Typography>
                    <Link color="inherit" href={props.link}>
                         <KeyboardArrowRightIcon fontSize='large' />
                    </Link>
                </Box>
            </Paper>
    </Grid>
    )
}



