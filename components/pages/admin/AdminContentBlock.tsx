import React from "react";
import AdminEdit from "./AdminEdit";

import {
	Paper,
	Box,
	Typography,
	IconButton,
	Menu,
	MenuItem,
} from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const OptionsMenu = (props: any) => {
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
				<MoreHorizIcon fontSize="medium" sx={{ color: "black" }} />
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
				<MenuItem value="edit" onClick={props.edit}>
					Edit
				</MenuItem>
				<MenuItem value="delete" onClick={props.delete}>
					Delete
				</MenuItem>
			</Menu>
		</div>
	);
};

const AdminContentBlock = ({
	content,
	editValue,
	saveFunction,
	editAction,
	deleteFunction,
}: {
	editValue?: { id: number; name: string };
	content: { id: number; name: string };
	saveFunction: (content: string) => void;
	editAction: (id: number) => void;
	deleteFunction: (id: number) => void;
}) => {
	return (
		<Paper>
			<Box
				p={2}
				mb={2}
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					border: "1px solid black",
					borderRadius: "4px",
				}}
			>
				{editValue && editValue.id === content.id ? (
					<AdminEdit editValue={editValue} saveFunction={saveFunction} />
				) : (
					<>
						<Typography fontWeight={300}>{content.name}</Typography>
						<OptionsMenu
							edit={() => editAction(content.id)}
							delete={() => deleteFunction(content.id)}
						/>
					</>
				)}
			</Box>
		</Paper>
	);
};

export default AdminContentBlock;
