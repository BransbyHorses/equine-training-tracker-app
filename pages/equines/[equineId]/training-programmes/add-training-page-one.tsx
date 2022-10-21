import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {createTheme} from "@mui/material/styles";
import {Button, Container, Grid, Link, Stack, TextField} from "@mui/material";
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Box from "@mui/material/Box";
import LinkButton from "../../../../components/LinkButton";
import  { makeStyles } from '@mui/styles';


const AddDate = ({}) => {
    const router = useRouter();
    const [date, setDate] = useState<string | undefined>(undefined);


    // const useStyles = makeStyles((theme: any) => ({
    //     footer: {
    //         position: 'fixed',
    //         bottom: 0,
    //         width: '100%',
    //         height: 60,
    //         textAlign: 'center'
    //     }
    // }));
    //
    // const classes = useStyles();

    useEffect(() => {
    }, []);



    return (
            <>
            <Box sx={{ m: 2 }} />
            <Box component="div" sx={{ display: 'inline' }}>
            <ArrowBackIosIcon sx={{ fontSize: "10px" }}/>
            </Box>
            <Box component="div" sx={{ display: 'inline' }}>
                <Link href="/" underline="always">
                    {'Back'}
                </Link>
            </Box>
    <Container sx={{display: "flex", justifyContent: "space-around", flexDirection: "column"}} >
        <Box >
            <Box sx={{ m: 2 }} />
            <Typography color="text.primary">What date did you do this training?</Typography>
            <Box sx={{ m: 2 }} />
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
                        defaultValue="2017-05-24"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Stack>
            </LocalizationProvider>
            </Grid>
        </Box>
            <LinkButton
                buttonHref="/"
                variant="contained"
                size="Large"
                color="white"
                action="Continue"
            />
            </Container>
            </>
    );
};

export default AddDate;
