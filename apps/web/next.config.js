const isStandalone = process.env.STANDALONE === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isStandalone && {output: 'standalone'}),
  transpilePackages: ['@rechat-sdk/react'],
  reactStrictMode: true,
  logging: {
    level: 'warn',
    fetches: {
      fullUrl: true
    }
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ]
  }
};

module.exports = nextConfig;