import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.pexels.com',
      'res.cloudinary.com',
      'cdn.dribbble.com',
      'example.com',
      'venngage-wordpress.s3.amazonaws.com',
      'f.hellowork.com',
      'plus.unsplash.com',
    ],
  },
  experimental: {
    reactCompiler: true,
  }
};

export default nextConfig;
