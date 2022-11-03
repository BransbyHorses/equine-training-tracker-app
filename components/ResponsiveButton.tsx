import { Button, useTheme } from "@mui/material";
import React from "react";

const ResponsiveButton = (props: any) => {
	const theme = useTheme();
	return (
		<Button
			variant="contained"
			sx={{
				backgroundColor: "primary.light",
				[theme.breakpoints.between("xs", "lg")]: {
					width: "90%",
					position: "absolute",
					bottom: "24px",
					left: "50%",
					transform: "translate(-50%, -50%)",
				},
				[theme.breakpoints.between("lg", "xl")]: {
					...props.desktopStyles,
				},
			}}
			{...props}
		>
			{props.children}
		</Button>
	);
};

export default ResponsiveButton;
