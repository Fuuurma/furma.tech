import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16.2 Agentic Improvements
  
  // Browser log forwarding - sends client errors to terminal
  // Makes debugging easier for AI agents monitoring terminal output
  logging: {
    browserToTerminal: 'error', // Options: 'error' | 'warn' | true | false
  },

  // Turbopack is enabled by default in Next.js 16.2
  // 400% faster startup, 50% faster rendering
  
  // Image optimization for AI-generated content
  images: {
    // Allow remote images from AI services
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
    ],
  },
};

export default nextConfig;
