import React from "react";
import { HealthAndSafetyFlag } from "../../../../utils/types";
import { convertDateToString } from "../../../../utils/helpers";

import { Box, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const OptionsMenu = ({ deleteFlag }: { deleteFlag: () => void }) => {
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
				<MoreHorizIcon fontSize="small" />
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
				<MenuItem value="delete" onClick={deleteFlag}>
					Delete
				</MenuItem>
			</Menu>
		</div>
	);
};

const HealthAndSafetyFlags = ({
	closeFlags,
	healthAndSafetyFlags,
	deleteFlag,
}: {
	closeFlags: () => void;
	healthAndSafetyFlags: HealthAndSafetyFlag[];
	deleteFlag: (id: number) => void;
}) => {
	return (
		<>
			<Box mb={2} sx={{ display: "flex", justifyContent: "space-between" }}>
				<AddCircleIcon
					fontSize="medium"
					onClick={closeFlags}
					sx={{ cursor: "pointer" }}
				/>
				<Typography>
					<em>
						{healthAndSafetyFlags!.length}{" "}
						{healthAndSafetyFlags!.length === 1 ? `Flag` : `Flags`}
					</em>
				</Typography>
			</Box>
			{healthAndSafetyFlags.length > 0 && (
				<Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
					{healthAndSafetyFlags.map((healthAndSafetyFlag, i, arr) => {
						return (
							<Box
								key={healthAndSafetyFlag.id}
								borderBottom={
									i < arr.length - 1 ? "0.5px solid lightGray" : "0"
								}
								pb={2}
								pt={2}
								sx={{ display: "flex", justifyContent: "space-between" }}
							>
								<Box mr={1}>
									<Typography>{healthAndSafetyFlag.content}</Typography>
									<Typography color="gray">
										<small>
											Added{" "}
											{convertDateToString(healthAndSafetyFlag.dateCreated)}
										</small>
									</Typography>
								</Box>
								<OptionsMenu
									deleteFlag={() => deleteFlag(healthAndSafetyFlag.id)}
								/>
							</Box>
						);
					})}
				</Box>
			)}
		</>
	);
};

export default HealthAndSafetyFlags;
