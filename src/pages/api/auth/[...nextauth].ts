import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

import { IAuthenticatedUser } from "types/next-auth";

const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn(user: IAuthenticatedUser, account, profile) {
      if (account.provider === "google") {
        const { accessToken, idToken } = account;

        try {
          const res = await axios.post(
            "http://127.0.0.1:8000/api/social/login/google",
            {
              access_token: accessToken,
              id_token: idToken,
            }
          );

          const { access_token } = res.data;
          user.accessToken = access_token;

          return true;
        } catch (error) {
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
};

export default function (req: NextApiRequest, res: NextApiResponse) {
  NextAuth(req, res, authOptions);
}
