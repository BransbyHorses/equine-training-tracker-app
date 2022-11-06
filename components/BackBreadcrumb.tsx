import React from "react";
import { useRouter } from "next/router";

import { Breadcrumbs, Link } from "@mui/material";
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
		<Breadcrumbs sx={{ mb: 2 }}>
			<Link
				underline="hover"
				color="inherit"
				sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
				onClick={
					link
						? () => router.push(link)
						: onClick
						? onClick
						: () => router.back()
				}
			>
				<ArrowLeftIcon /> Back
			</Link>
		</Breadcrumbs>
	);
};

export default BackBreadcrumb;
