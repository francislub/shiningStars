/* @type {import('next').NextConfig} */
const nextConfig = {
  images: {

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fra.cloud.appwrite.io',
      },
      {
        protocol: 'http',
        hostname: 'cdn.hashnode.com',
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https', // Google Photos uses HTTPS
        hostname: 'photos.google.com',
      },
      {
        protocol: 'https', 
        hostname: "images.unsplash.com",
      },
    ],
    domains: ['fra.cloud.appwrite.io'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig