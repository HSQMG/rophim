import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["bazaarvietnam.vn", "hmkeyewear.com", "millamona.monamedia.net"],
  },
  reactStrictMode: true,
  output: "standalone",
  extend: {
    fontFamily: {
      classy: ["FCClassyVogue", "serif"],
    },
  },
};

export default nextConfig;
