/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true, // Optional: adds a trailing slash to URLs
  images: {
    unoptimized: true, // Optional: avoid processing images if not using next/image
  },
  async rewrites() {
    return [
      {
        source: '/3rdparty/:path*',
        destination: 'http://localhost:3002/3rdparty/:path*', // URL đích cho proxy
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: '*' },
          { key: 'Access-Control-Allow-Headers', value: '*' },
        ],
      },
    ];
  },
};

export default nextConfig;
