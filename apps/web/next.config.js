const isStandalone = process.env.STANDALONE === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isStandalone && {output: 'standalone'}),
  transpilePackages: ['@chatscale/react'],
  reactStrictMode: true,
  distDir: '.vercel_build_output',
  logging: {
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