/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // <-- THIS IS THE MAGIC FIX FOR GITHUB PAGES
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
