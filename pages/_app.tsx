import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import Header from '../components/Header';

export default function MyApp({ Component, pageProps}: AppProps) {
  return (
      <>
          <SessionProvider session={pageProps.session}>
              <Header />
              <Component {...pageProps} />
          </SessionProvider>
      </>
  );
}
