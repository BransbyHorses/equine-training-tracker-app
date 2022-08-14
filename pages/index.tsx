import {signIn, signOut, useSession } from 'next-auth/react';
import { Container, Button, Typography } from '@mui/material';
import SignInContainer from '../components/styles/signInContainer';

export default function Home() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  const signInUser = () => {
    signIn('cognito', {
      callbackUrl: `${window.location.origin}/equines`
    })
  }

  const signOutUser = () => {
    signOut()
  }

  return (
      <main>
          <Container>
              {!session && (
                  <SignInContainer>
                      <Typography
                          variant="h5"
                          color="textSecondary"
                          gutterBottom
                      >
                          Sign in to access Bransby Horses App
                      </Typography>
                      <Button
                          color="primary"
                          variant="contained"
                          onClick={signInUser}
                      >
                          Sign In
                      </Button>
                  </SignInContainer>
              )}
              {session && (
                  <Button
                      color="primary"
                      variant="contained"
                      onClick={signOutUser}
                  >
                      Sign Out
                  </Button>
              )}
          </Container>
      </main>
  );
}
