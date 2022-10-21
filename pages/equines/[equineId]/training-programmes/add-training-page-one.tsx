import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import {LocalizationProvider, DatePicker} from "@mui/x-date-pickers";
import { Container, Grid, Link, Stack, TextField} from "@mui/material";
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Box from "@mui/material/Box";
import LinkButton from "../../../../components/LinkButton";



const AddDate = ({}) => {
    const router = useRouter();
    const [val, setVal] = useState(new Date());


    useEffect(() => {
    }, []);

    const handleChange = (e: any) => {
        setVal(e.target.value)
        console.log(val);
    }

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
                        //value={value}
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChange}
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
