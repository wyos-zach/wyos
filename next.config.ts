/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PROJECT_ID: process.env.PROJECT_ID,
    ENDPOINT: process.env.ENDPOINT,
    BUCKET_ID: process.env.BUCKET_ID,
  },
};
module.exports = nextConfig;
