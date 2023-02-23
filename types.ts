import { User } from "next-auth";

export interface IAuthenticatedUser extends User {
  accessToken?: string;
  refreshToken?: string;
}
