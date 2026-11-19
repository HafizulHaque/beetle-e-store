import type { NextConfig } from "next";
import imageVariants from "./image-variants.json";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./util/image-loader.ts",
    imageSizes: [imageVariants.widths[0]],
    deviceSizes: imageVariants.widths.slice(1),
  },
  experimental: {
    agentUpgrade: "security",
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
