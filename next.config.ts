import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dribbble.com',
      },
      {
        protocol: 'https',
        hostname: 'venngage-wordpress.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'f.hellowork.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
  experimental: {
    reactCompiler: true,
  },
  // Deactivate optimization for react-icons
  webpack: (config) => {
    config.optimization.minimize = false;
    return config;
  },
};

export default nextConfig;
