import { Account } from "next-auth";

export interface IAuthenticatedAccount extends Account {
  accessToken?: string;
  refreshToken?: string;
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}
