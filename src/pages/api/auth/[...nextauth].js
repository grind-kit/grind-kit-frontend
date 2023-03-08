import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";

const settings = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      if (account.provider === "google") {
        const { accessToken, idToken } = account;

        try {
          const response = await axios.post(
            `${process.env.DJANGO_URL}/api/auth/google/`,
            { access_token: accessToken, id_token: idToken }
          );
          const { access_token } = response.data;
          user.accessToken = access_token;

          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return false;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (user) {
        const { accessToken } = user;

        token.accessToken = accessToken;
      }

      return token;
    },
    async session(session, user) {
      session.accessToken = user.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  }
};

export default (req, res) => NextAuth(req, res, settings);
