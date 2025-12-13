import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
  /* config options here */
};

export default nextConfig;
