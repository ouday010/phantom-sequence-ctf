/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Netlify deployment
  output: 'export',
  // Empty config is fine! App router is default in Next 15.
  // Removed experimental: { appDir: true }
}

module.exports = nextConfig
