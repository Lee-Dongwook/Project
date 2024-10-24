/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: 'ignore-loader',
    });
    config.externals = [...config.externals, 'bcrypt'];
    return config;
  },
};

export default nextConfig;
