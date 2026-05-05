/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/csid', // <-- THIS FIXES THE BLANK SCREEN
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
