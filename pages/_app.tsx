import { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "../public/css/main.css";

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
			sm: 600,
			md: 900,
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
	},
});

export default function MyApp({ Component, pageProps }: AppProps<{
	session: Session;
  }>) {
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
