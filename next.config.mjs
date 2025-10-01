/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pb.endersmoon.in",
      },
    ],
  },
};

export default nextConfig;
