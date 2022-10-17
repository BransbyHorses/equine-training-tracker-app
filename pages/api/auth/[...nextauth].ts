import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito"
import jwt_decode from 'jwt-decode'

let clientId: string = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '';
let clientSecret: string = process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET || '';

export default NextAuth({
  providers: [
    CognitoProvider({
      clientId,
      clientSecret,
      issuer: process.env.NEXT_PUBLIC_COGNITO_ISSUER
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        let decodedToken: any = jwt_decode(account.access_token!);
        token.role = decodedToken["cognito:groups"] ? decodedToken["cognito:groups"][0] : null;
        token.sub = decodedToken['sub'];
      }
      return token;
    },

    async session({ session, token }){
      session.role = token.role;
      session.userId = token.sub;
      return session;
    }
  }
})