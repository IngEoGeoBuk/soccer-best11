/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'localhost', 'firebasestorage.googleapis.com', 'soccer-best11-production.up.railway.app'],
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
}

module.exports = nextConfig
