// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Enable static HTML export
  output: 'export',
  
  // 2. Add trailing slashes to all paths (required by GitHub Pages)
  trailingSlash: true,

  // 3. Set the basePath and assetPrefix to your repository name
  // CRITICAL: Replace 'csid' with the EXACT name of your GitHub repository
  basePath: '/csid',
  assetPrefix: '/csid',

  // 4. Disable the default image optimization API as it requires a Node.js server
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
