/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Enable cache busting for development
  generateBuildId: async () => {
    // Use timestamp for unique build IDs
    return `build-${Date.now()}`
  },
  // Disable static optimization for better cache busting
  experimental: {
    esmExternals: 'loose',
  },
  // Add cache headers to prevent aggressive caching in development
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  },
}

export default nextConfig
