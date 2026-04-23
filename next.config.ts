import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
    eslint: {
    // !! WARN !! This allows production builds to successfully complete
    // even if your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["res.cloudinary.com","lh3.googleusercontent.com", "avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;

export default nextConfig;
