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

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const accessToken = account.access_token;
        const idToken = account.id_token;

        console.log(idToken);

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

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default (req, res) => NextAuth(req, res, settings);
