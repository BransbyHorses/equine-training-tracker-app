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
import AddDate from "./components/AddDate";



const AddTraining = ({}) => {
    const router = useRouter();
    const [equine, setEquine] = useState(
    );

    const [date, setDate] = useState(
        null
    );

    const [environment, setEnvironment] = useState(
    );
    const [method, setMethod] = useState(
    );
    const [skill, setSkill] = useState(
    );



    const handleChange = (e: any) => {
        startDate = (e.target.value);

    }

    let startDate: any ;

    const handleDateClick = () => {
        setDate(startDate)
    }

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
                {date ? null : <AddDate handleChange={handleChange}/>}
            </>
    );
};

export default AddTraining;
