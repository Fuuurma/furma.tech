import type { NextConfig } from "next";
import { SECURITY_HEADERS } from "./src/lib/security-headers";

const nextConfig: NextConfig = {
  logging: {
    browserToTerminal: "error",
  },

  async headers() {
    return [{ source: "/(.*)", headers: [...SECURITY_HEADERS] }];
  },

  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/docs", destination: "/", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/projects/:path*", destination: "/portfolio/:path*", permanent: true },
      { source: "/products", destination: "/portfolio", permanent: true },
      { source: "/products/:slug", destination: "/portfolio/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
