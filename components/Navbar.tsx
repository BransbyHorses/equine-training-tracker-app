import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut } from "next-auth/react";
import HomeIcon from "./HomeIcon";
import NavMenu from "./NavMenu";

export default function ButtonAppBar() {
	const [navMenuOpen, setNavMenuOpen] = useState(false);

	const openNavMenu = () => {
		setNavMenuOpen(true);
	};

	const closeNavMenu = () => {
		setNavMenuOpen(false);
	};

	const navMenuWidth = 250;

	const signOutUser = () => {
		signOut({
			callbackUrl: `${window.location.origin}/`,
		});
	};

	return (
		<Box sx={{ flexGrow: 1, marginBottom: '50px' }}>
			<AppBar position="static">
				<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
					<IconButton size="small" color="inherit" aria-label="home">
						<HomeIcon />
					</IconButton>
					<IconButton color="inherit" aria-label="open navigation menu">
						<MenuIcon
							sx={{
								height: "2.1rem",
								width: "2.1rem",
								...(navMenuOpen && { display: "none" }),
							}}
							onClick={openNavMenu}
						/>
					</IconButton>
				</Toolbar>
			</AppBar>
			<NavMenu
				drawerWidth={navMenuWidth}
				open={navMenuOpen}
				collapse={() => closeNavMenu()}
			/>
		</Box>
	);
}
