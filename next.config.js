/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@tabler/icons-react'],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'drive.google.com' },
    ],
  },
}

module.exports = nextConfig
