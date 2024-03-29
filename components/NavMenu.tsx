import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { styled, useTheme } from "@mui/material/styles";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: "flex-start",
}));

export interface NavMenuProps {
	drawerWidth: number;
	open: boolean;
	collapse: () => void;
	signOut: () => void;
}

const NavMenu = ({ drawerWidth, open, collapse, signOut }: NavMenuProps) => {
	const theme = useTheme();
	const router = useRouter();
	const session: any = useSession();

	const handleMenuNavigation = (path: string) => {
		collapse();
		router.push(`/${path}`);
	};

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
				},
			}}
			variant="persistent"
			anchor="right"
			open={open}
		>
			<DrawerHeader>
				<IconButton onClick={collapse}>
					{theme.direction === "rtl" ? (
						<ChevronLeftIcon />
					) : (
						<ChevronRightIcon />
					)}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List>
				<ListItem disablePadding>
					<ListItemButton onClick={() => handleMenuNavigation("")}>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItemButton>
				</ListItem>
				{session.data && session.data.role === "ADMIN" && (
					<ListItem disablePadding>
						<ListItemButton onClick={() => handleMenuNavigation("admin")}>
							<ListItemIcon>
								<AdminPanelSettingsIcon />
							</ListItemIcon>
							<ListItemText primary="Admin" />
						</ListItemButton>
					</ListItem>
				)}
			</List>
			<Divider />
			<List>
				<ListItem>
					<Button
						onClick={signOut}
						color="primary"
						variant="contained"
						sx={{ width: "100%" }}
					>
						Sign Out
					</Button>
				</ListItem>
			</List>
		</Drawer>
	);
};

export default NavMenu;
