/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // Firebase env variables
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,

    // XIVAPI env variables
    XIVAPI_URL: process.env.XIVAPI_URL,
  },
  productionBrowserSourceMaps: true,
};

module.exports = {
  ...nextConfig,
  images: {
    domains: ["img2.finalfantasyxiv.com", "xivapi.com"],
  },
};
