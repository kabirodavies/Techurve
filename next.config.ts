import type { NextConfig } from "next";
import type { Configuration } from 'webpack';
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: any) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

module.exports = nextConfig


