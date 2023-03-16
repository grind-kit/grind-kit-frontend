declare namespace NodeJS {
  export interface ProcessEnv {
    GOOGLE_CLIENT_ID: string | undefined;
    GOOGLE_CLIENT_SECRET: string | undefined;
    SECRET: string | undefined;
        
    NEXTAUTH_URL: string | undefined;
    DJANGO_URL: string | undefined;
    
    XVIAPI_KEY: string | undefined;
  }
}
