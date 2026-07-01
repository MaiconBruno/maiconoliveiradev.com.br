import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  transpilePackages: ['@portfolio/types'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.maiconoliveiradev.com.br',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'api',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
