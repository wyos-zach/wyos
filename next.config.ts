import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // Helps identify potential problems in application
  images: {
    domains: ['images.unsplash.com'], // We'll need this for image optimization
  },
  compiler: {
    // Removes console.log in production but keeps them in development
    removeConsole: process.env.NODE_ENV === 'production',
  },
  typescript: {
    ignoreBuildErrors: false, // Ensures TypeScript errors prevent builds
  },
};

export default nextConfig;
