/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  
 images: {
    // Prefer remotePatterns for fine-grained control
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyjson.com",
      },
    ]
  }
};

export default nextConfig;
