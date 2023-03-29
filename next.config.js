/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    XIVAPI_KEY: process.env.XIVAPI_KEY,
  },
};

module.exports = nextConfig;
