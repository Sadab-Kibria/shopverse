import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com","lh3.googleusercontent.com", "avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;

export default nextConfig;
