import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Box } from "@mui/material";

const HomeIcon = () => {
	return (
		<Link href="/">
			<Box sx={{ height: "50px", width: "120px", position: "relative" }}>
				<Image src="/assets/bransbyLogo.svg" alt="Bransby Horses Logo" layout="fill" priority />
			</Box>
		</Link>
	);
};

export default HomeIcon;
