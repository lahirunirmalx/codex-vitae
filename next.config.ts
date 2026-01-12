import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable dev indicators in production
  devIndicators: false,
  
  // Enable image optimization for external sources if needed
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'gitlab.com',
      },
    ],
  },
  
  // Ensure environment variables are available
  env: {
    GIT_PROVIDER: process.env.GIT_PROVIDER,
    GITHUB_API_URL: process.env.GITHUB_API_URL,
    GITLAB_API_URL: process.env.GITLAB_API_URL,
  },
};

export default nextConfig;
