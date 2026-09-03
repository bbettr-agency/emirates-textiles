/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Real assets live in /public — no placeholder hosts (SYSTEM/02 launch rule).
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
};

module.exports = nextConfig;
