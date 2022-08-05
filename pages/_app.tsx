import Head from 'next/head'
import { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
          <Head>
              <meta charSet="utf-8" />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta
                  name="viewport"
                  content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
              />
              <title>Equine Training Tracker</title>

              <link rel="manifest" href="/manifest.json" />
              <link
                  href="/icons/favicon-16x16.png"
                  rel="icon"
                  type="image/png"
                  sizes="16x16"
              />
              <link
                  href="/icons/favicon-32x32.png"
                  rel="icon"
                  type="image/png"
                  sizes="32x32"
              />
              <link rel="apple-touch-icon" href="/apple-icon.png"></link>
              <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
              />
              <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/icon?family=Material+Icons"
              />
              <meta name="theme-color" content="#317EFB" />
          </Head>
          <Component {...pageProps} />
      </>
  );
}
