/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',

  // Set base path for GitHub Pages (username.github.io)
  // If deploying to username.github.io, keep basePath as ''
  // If deploying to username.github.io/repo-name, set basePath: '/repo-name'
  basePath: '', // Change this if using a project repo (e.g., '/website-business')

  // Disable image optimization for static export
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'bizmaster.renovativelab.com',
        pathname: '/uploads/**',
      },
    ],
  },

  // Ensure trailing slashes for GitHub Pages
  trailingSlash: true,
};

export default nextConfig;
