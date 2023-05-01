/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Variables will be loaded at build time from .env file

    // Firebase env variables
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,

    // XIVAPI env variables
    XIVAPI_KEY: process.env.XIVAPI_KEY,
    XIVAPI_URL: process.env.XIVAPI_URL,

    // Backend env variables
    BACKEND_URL: process.env.BACKEND_URL,
  },
  productionBrowserSourceMaps: true,
};

module.exports = {
  ...nextConfig,
  images: {
    domains: ["img2.finalfantasyxiv.com", "xivapi.com"],
  },
};
