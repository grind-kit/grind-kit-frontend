declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_FIREBASE_API_KEY: string | undefined;
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string | undefined;
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: string | undefined;
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string | undefined;
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string | undefined;
    NEXT_PUBLIC_FIREBASE_APP_ID: string | undefined;

    XVIAPI_KEY: string | undefined;

    BACKEND_URL: string | undefined;
  }
}
