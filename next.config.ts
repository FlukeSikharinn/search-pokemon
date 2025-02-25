/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.pokemondb.net'],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
