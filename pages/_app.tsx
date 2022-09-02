import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import { ThemeProvider,createTheme } from '@mui/material/styles';

const Theme = createTheme({
    palette: {
        primary: {
            main: '#222853'
        }
    }
})

export default function MyApp({ Component, pageProps}: AppProps) {
  return (
      <ThemeProvider theme={Theme}>
          <SessionProvider session={pageProps.session}>
              <Header/>
              <Navbar/>
              <Component {...pageProps} />
          </SessionProvider>
      </ThemeProvider>
  );
}
