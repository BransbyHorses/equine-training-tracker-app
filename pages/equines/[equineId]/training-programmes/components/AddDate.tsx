import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import {LocalizationProvider, DatePicker} from "@mui/x-date-pickers";
import {Button, Container, Grid, Link, Stack, TextField} from "@mui/material";
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Box from "@mui/material/Box";



const AddDate = (props: any) => {
    const router = useRouter();
    const [val, setVal] = useState(new Date());


    useEffect(() => {
    }, []);


    return (
        <>

            <Container sx={{display: "flex", justifyContent: "space-around", flexDirection: "column"}} >
                <Box >
                    <Box sx={{ m: 4 }} />
                    <Typography >What date did you do this training?</Typography>
                    <Box sx={{ m: 4 }} />
                    <Grid
                        container
                        justifyContent="space-evenly"
                        alignItems="center"
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack component="form" noValidate spacing={3}>
                                <TextField
                                    id="date"
                                    label="Birthday"
                                    type="date"
                                    defaultValue="2022-10-20"
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={props.handleChange}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Grid>
                </Box>
                <Button
                    // variant="contained"
                    // size="Large"
                    color="secondary"
                    onClick={props.handleDateClick}
                />
            </Container>
        </>
    );
};

export default AddDate;
