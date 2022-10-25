/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  reactStrictMode: true,
  experimental: {
    outputStandalone: true
  },  
})

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({});
