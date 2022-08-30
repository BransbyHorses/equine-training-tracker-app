import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { signIn, signOut, useSession } from 'next-auth/react';
import HomeIcon from './HomeIcon';

export default function ButtonAppBar() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const signInUser = () => {
        signIn('cognito', {
            callbackUrl: `${window.location.origin}/equines`
        });
    };

    const signOutUser = () => {
        signOut({
            callbackUrl: `${window.location.origin}/`
        });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <MenuIcon sx={{ height: '2.1rem', width: '2.1rem'}}/>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <HomeIcon />
                    </IconButton>

                    {!session && (
                        <Button color="inherit" onClick={signInUser}>
                            Login
                        </Button>
                    )}
                    {session && (
                        <Button color="inherit" onClick={signOutUser}>
                            Sign Out
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
