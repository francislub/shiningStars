/* @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
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
    ],
  },
}

module.exports = nextConfig