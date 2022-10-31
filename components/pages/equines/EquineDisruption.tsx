import React from "react";

import { convertDateToString } from "../../../utils/helpers";
import { Disruption } from "../../../utils/types";

import { Box, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const OptionsMenu = ({ endFunction }: { endFunction: () => void }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const ITEM_HEIGHT = 48;
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? "long-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreHorizIcon fontSize="small" sx={{ color: "black" }} />
			</IconButton>
			<Menu
				id="long-menu"
				MenuListProps={{
					"aria-labelledby": "long-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: "20ch",
					},
				}}
			>
				<MenuItem value="delete" onClick={endFunction}>
					End
				</MenuItem>
			</Menu>
		</div>
	);
};

const EquineDisruption = ({
	disruption,
	endFunction,
}: {
	disruption: Disruption;
	endFunction: () => void;
}) => {
	return (
		<Box
			px={1}
			py={1.5}
			sx={{
				backgroundColor: "warning.light",
				display: "flex",
				alignItems: "center",
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					width: "100%",
				}}
			>
				<ErrorIcon fontSize="medium" sx={{ color: "warning.dark", mr: 1 }} />
				<Box>
					<Typography fontWeight={700} lineHeight={1.2}>
						<small>{disruption.reason.string}</small>
					</Typography>
					<Typography lineHeight={1}>
						<small>
							Training disrupted since{" "}
							{convertDateToString(disruption.startDate)}
						</small>
					</Typography>
				</Box>
			</Box>
			<OptionsMenu endFunction={endFunction} />
		</Box>
	);
};

export default EquineDisruption;
