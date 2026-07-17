import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    browserToTerminal: "error",
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.vercel.app",
      },
    ],
  },

  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/docs", destination: "/", permanent: true },
      { source: "/contact", destination: "/", permanent: true },
      { source: "/projects/:path*", destination: "/portfolio/:path*", permanent: true },
      { source: "/products", destination: "/portfolio", permanent: true },
      { source: "/products/:slug", destination: "/portfolio/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
