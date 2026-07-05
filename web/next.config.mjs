/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // brand shots are large PNGs shipped from /public
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
