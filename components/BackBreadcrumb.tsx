

import {Breadcrumbs, Link} from "@mui/material";
import React from "react";

export default function BackBreadcrumb(props:any) {

    return (
    <>
        <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href={props.link}>
                &lt; Back
            </Link>
        </Breadcrumbs>
    </>
    )
}