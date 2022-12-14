import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad";
import CognitoProvider from "next-auth/providers/cognito";
import jwt_decode from 'jwt-decode'

export default NextAuth({
	providers: [
		// AzureADProvider({
		// 	clientId: process.env.AZURE_AD_CLIENT_ID!,
		// 	clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
		// 	tenantId: process.env.AZURE_AD_TENANT_ID,
		// }),
		CognitoProvider({
			clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
			clientSecret: process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET!,
			issuer: process.env.NEXT_PUBLIC_COGNITO_ISSUER,
		}),
	],

	session: {
		strategy: "jwt",
	},

	callbacks: {
		// async jwt({ token, account }) {
		// 	if (account) {
		// 		token.accessToken = account.access_token;
		// 		let decodedToken: any = jwt_decode(account.access_token!);
		// 		let wids = decodedToken["wids"] ? decodedToken["wids"][0] : null;
		// 		token.role =
		// 			wids === "62e90394-69f5-4237-9190-012177145e10" ? "ADMIN" : null;
		// 		token.sub = decodedToken["sub"];
		// 	}
		// 	return token;
		// },
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token;
				let decodedToken: any = jwt_decode(account.access_token!);
				token.role = decodedToken["cognito:groups"]
					? decodedToken["cognito:groups"][0]
					: null;
				token.sub = decodedToken["sub"];
			}
			return token;
		},

		async session({ session, token }: { session: any; token: any }) {
			session.role = token.role;
			session.userId = token.sub;
			return session;
		},
	},
});