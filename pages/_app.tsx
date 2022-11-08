import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { SessionProvider } from "next-auth/react";

import "../public/css/main.css";
import Header from "../components/Header";
const Navbar = dynamic(() => import("../components/Navbar"));
import Footer from "../components/Footer";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";

const Theme = createTheme({
	components: {
		MuiTypography: {
			defaultProps: {
				variantMapping: {
					h1: "h1",
					h2: "h2",
					h3: "h3",
					h4: "h4",
					h5: "h5",
					h6: "h6",
					body1: "p",
				},
			},
		},
	},
	typography: {
		h6: {
			fontSize: "20px",
			fontWeight: 500,
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 500,
			md: 750,
			lg: 1200,
			xl: 3000,
		},
	},
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
		warning: {
			main: "#ffa726",
			dark: "#f57c00",
			light: "rgba(255, 183, 77, 0.5)",
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
					<Footer />
			</SessionProvider>
		</ThemeProvider>
	);
}
