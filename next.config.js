/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const pwaConfig = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  reactStrictMode: true,
  });
  
  delete pwaConfig.pwa;
  
  module.exports = pwaConfig;