import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  darkMode: "class",
  images: {
    domains: [
      "bazaarvietnam.vn",
      "hmkeyewear.com",
      "millamona.monamedia.net",
      "",
    ],
  },
  reactStrictMode: true,
  output: "standalone",
  extend: {
    fontFamily: {
      classy: [
        "FCClassyVogue",
        "serif",
        "Hatton-Light",
        "Hatton-Regular",
        "Hatton-Bold",
        "Hagrid-Italic-trial",
        "Hatton-Semibold",
        "Hatton-Ultralight",
      ],
    },
  },
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("@tailwindcss/line-clamp")],
};
export default nextConfig;
