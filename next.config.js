const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'localhost',
      'firebasestorage.googleapis.com',
      'soccer-best11-production.up.railway.app',
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')();

module.exports =
  process.env.ANALYZE === 'true'
    ? withBundleAnalyzer(nextConfig)
    : withNextIntl(nextConfig);
