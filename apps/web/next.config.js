/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@chatscale/react'],
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
