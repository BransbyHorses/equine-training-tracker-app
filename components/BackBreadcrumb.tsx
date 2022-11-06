import React from "react";
import { useRouter } from "next/router";

import { Link } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const BackBreadcrumb = ({
	link,
	onClick,
}: {
	link?: string;
	onClick?: () => void;
}) => {
	const router = useRouter();
	return (
		<Link
			underline="hover"
			color="inherit"
			sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
			onClick={
				link ? () => router.push(link) : onClick ? onClick : () => router.back()
			}
		>
			<ArrowLeftIcon /> Back
		</Link>
	);
};

export default BackBreadcrumb;
