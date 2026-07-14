import path from 'node:path';

const nextConfig = {
  devIndicators: false,
  async redirects() {
    return [{ source: '/recipes/all', destination: '/recipes', permanent: true }];
  },
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
