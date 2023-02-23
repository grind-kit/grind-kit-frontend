declare namespace NodeJS {
  export interface ProcessEnv {
    GOOGLE_CLIENT_ID: string | undefined;
    GOOGLE_CLIENT_SECRET: string | undefined;
  }
}

declare module "next-auth/client";
