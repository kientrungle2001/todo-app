/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true, // Optional: adds a trailing slash to URLs
    images: {
        unoptimized: true, // Optional: avoid processing images if not using next/image
    },
};

export default nextConfig;
