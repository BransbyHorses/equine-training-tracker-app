import React from "react";

import { useRouter } from "next/router";

import { Breadcrumbs, Link } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const BackBreadcrumb = ({ link }: { link?: string }) => {
	const router = useRouter();
	return (
		<Breadcrumbs>
			<Link
				underline="hover"
				color="inherit"
				sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
				onClick={link ? () => router.push(link) : () => router.back()}
			>
				<ArrowLeftIcon /> Back
			</Link>
		</Breadcrumbs>
	);
};

export default BackBreadcrumb;
