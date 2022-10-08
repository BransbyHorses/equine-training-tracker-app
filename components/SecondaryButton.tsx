import {Grid, Paper, Box, Typography} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
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
                    <ArrowRightIcon fontSize="large" />
                </Box>
            </Paper>
    </Grid>
    )
}



