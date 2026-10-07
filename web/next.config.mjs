/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fully static site (hosted on Cloudflare Pages). Orders, products and the
  // admin dashboard talk to Convex directly from the browser.
  output: "export",
  images: { unoptimized: true }, // no image server on a static host

};

export default nextConfig;
