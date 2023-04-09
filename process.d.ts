declare namespace NodeJS {
  export interface ProcessEnv {
    FIREBASE_API_KEY: string | undefined;
    FIREBASE_AUTH_DOMAIN: string | undefined;
    FIREBASE_PROJECT_ID: string | undefined;
    FIREBASE_STORAGE_BUCKET: string | undefined;
    FIREBASE_MESSAGING_SENDER_ID: string | undefined;
    FIREBASE_APP_ID: string | undefined;

    XVIAPI_KEY: string | undefined;

    BACKEND_URL: string | undefined;
  }
}
