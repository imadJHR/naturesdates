import path from 'node:path';

const nextConfig = {
  devIndicators: false,
  images: {
    qualities: [75, 88],
  },
  async redirects() {
    return [{ source: '/recipes/all', destination: '/recipes', permanent: true }];
  },
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
