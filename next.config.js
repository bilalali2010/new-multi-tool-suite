/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // helps catch bugs early
  swcMinify: true,       // faster builds with Next.js compiler
  experimental: {
    appDir: true,        // already using app directory
  },
};

module.exports = nextConfig;
