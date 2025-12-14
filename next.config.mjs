/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  transpilePackages: ['next-sanity'],
  serverExternalPackages: ['jsdom', 'isomorphic-dompurify'],
};

export default nextConfig;
