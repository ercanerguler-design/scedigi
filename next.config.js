/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'scedigital.com'],
  },
  env: {
    CUSTOM_KEY: 'sce-digital-platform',
  },
}

module.exports = nextConfig
