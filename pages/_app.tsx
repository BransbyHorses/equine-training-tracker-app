import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "../public/css/main.css";

const Theme = createTheme({
	palette: {
		primary: {
			main: "#222853",
			light: "#74ADDF",
		},
		secondary: {
			main: "#ff7961",
		},
		common: {
			black: "#000",
			white: "#fff",
		},
		info: {
			main: "#5B5B5B",
		},
	},
});

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={Theme}>
			<SessionProvider session={pageProps.session}>
				<Header />
				<Navbar />
				<Container>
					<main>
						<Component {...pageProps} />
					</main>
				</Container>
			</SessionProvider>
		</ThemeProvider>
	);
}
