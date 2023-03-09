import NextAuth from "next-auth";
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";

const settings = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn(user, account, profile) {
      console.log(user.account);

      if (user.account.provider === "google") {
        const accessToken = user.account.access_token;
        const idToken = user.account.id_token;

        try {
          const response = await axios.post(
            `${process.env.DJANGO_URL}/api/social/login/google/`,
            {
              access_token: accessToken,
              id_token: idToken,
            }
          );

          const { access_token } = response.data;
          user.accessToken = access_token;

          return true;
        } catch (error) {
          return false;
        }
      }
      return false;
    },

    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default (req, res) => NextAuth(req, res, settings);
