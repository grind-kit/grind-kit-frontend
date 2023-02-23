import NextAuth, { Account, User } from "next-auth";

export interface IAuthenticatedUser extends User {
  accessToken?: string;
  refreshToken?: string;
}

declare module "next-auth" {
  interface Session {
    accessToken?: Account.accessToken;
  }
}
