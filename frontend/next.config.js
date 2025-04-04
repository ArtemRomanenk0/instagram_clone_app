/** @type {import('next').NextConfig} */
const nextConfig = {
  
  reactStrictMode: true,
  // Если нужен assetPrefix, его можно указать здесь, но пока оставляем пустым
  assetPrefix: '',
  experimental: {
    optimizeFonts: false
  }
  
};

module.exports = nextConfig;