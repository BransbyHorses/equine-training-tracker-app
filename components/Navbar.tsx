import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function ButtonAppBar() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    const signInUser = () => {
        signIn('cognito', {
          callbackUrl: `${window.location.origin}/equines`
        })
        
      }
    
      const signOutUser = () => {
        signOut({
            callbackUrl: `${window.location.origin}/`
          })
      }
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        {/* <MenuIcon /> */}
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Bransby Horse Rescue and Welfare
                    </Typography>

                    {!session && (
                            <Button
                                color="inherit"
                                onClick={signInUser}
                            >
                                Login
                            </Button>
                      
                    )}
                    {session && (
                        <Button
                            color="inherit"
                            onClick={signOutUser}
                        >
                            Sign Out
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
