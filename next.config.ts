import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Browser log forwarding - sends client errors to terminal
  logging: {
    browserToTerminal: 'error',
  },

  // Turbopack is enabled by default in Next.js 16.2
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
    ],
  },
};

export default nextConfig;
