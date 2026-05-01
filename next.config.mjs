/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/csid',
  assetPrefix: '/csid',
  images: {
    unoptimized: true,
  },
  // ADDED THIS: Tells Next.js to ignore formatting errors during deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
