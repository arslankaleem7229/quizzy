import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "standalone",
  images: {
    // path: "@/public",
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "amzn-s3-quizzy-bucket.s3.eu-west-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
